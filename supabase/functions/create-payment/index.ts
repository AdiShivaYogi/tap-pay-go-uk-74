
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@12.5.0"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get the user from the authorization header
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      console.error('No authorization header provided')
      throw new Error('No authorization header')
    }

    // Create Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // Get user by token
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(
      authHeader.replace('Bearer ', '')
    )
    
    if (userError || !user) {
      console.error('User authentication failed:', userError)
      throw new Error('Unauthorized')
    }

    console.log(`Processing payment creation for user: ${user.id}`)

    const { amount, description } = await req.json()
    
    // Validate amount
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      console.error('Invalid amount provided:', amount)
      throw new Error('Invalid amount. Please provide a positive number.')
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    // Check if user already exists as a Stripe customer
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1
    })

    // Get or create customer
    let customerId: string
    if (customers.data.length > 0) {
      customerId = customers.data[0].id
      console.log(`Using existing Stripe customer: ${customerId}`)
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id
        }
      })
      customerId = customer.id
      console.log(`Created new Stripe customer: ${customerId}`)
    }

    // Create a payment session with enhanced metadata
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: description || 'Payment',
              metadata: {
                user_id: user.id,
              }
            },
            unit_amount: Math.round(parseFloat(amount) * 100), // Convert to pence
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/dashboard?success=true`,
      cancel_url: `${req.headers.get('origin')}/dashboard?canceled=true`,
      metadata: {
        user_id: user.id,
        description: description || 'Payment'
      }
    })

    console.log(`Created payment session: ${session.id}`)

    // Save transaction to database with additional metadata
    const { error: insertError } = await supabaseAdmin
      .from('transactions')
      .insert({
        user_id: user.id,
        amount: amount,
        status: 'pending',
        currency: 'GBP',
        stripe_session_id: session.id,
      })

    if (insertError) {
      console.error('Error inserting transaction:', insertError)
      throw insertError
    }

    console.log(`Successfully created transaction record for session: ${session.id}`)

    return new Response(
      JSON.stringify({ 
        url: session.url,
        sessionId: session.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error creating payment:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    )
  }
})
