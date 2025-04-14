
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
    const stripeSignature = req.headers.get("stripe-signature")
    if (!stripeSignature) {
      throw new Error("No Stripe signature found")
    }

    // Get the raw body as text
    const body = await req.text()

    // Initialize Stripe with the secret key
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    // Verify the webhook signature
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    if (!webhookSecret) {
      throw new Error("Webhook secret not configured")
    }

    // Construct the event
    const event = stripe.webhooks.constructEvent(
      body,
      stripeSignature,
      webhookSecret
    )

    console.log(`Processing event type: ${event.type}`)

    // Initialize Supabase client with service role key for admin access
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // Handle specific event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Update transaction status in database
        const { error } = await supabaseAdmin
          .from('transactions')
          .update({ 
            status: 'completed',
            stripe_payment_intent_id: session.payment_intent as string
          })
          .eq('stripe_session_id', session.id)

        if (error) throw error
        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Update transaction status in database
        const { error } = await supabaseAdmin
          .from('transactions')
          .update({ status: 'expired' })
          .eq('stripe_session_id', session.id)

        if (error) throw error
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        // Update transaction status in database
        const { error } = await supabaseAdmin
          .from('transactions')
          .update({ status: 'failed' })
          .eq('stripe_payment_intent_id', paymentIntent.id)

        if (error) throw error
        break
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    })

  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400
      }
    )
  }
})
