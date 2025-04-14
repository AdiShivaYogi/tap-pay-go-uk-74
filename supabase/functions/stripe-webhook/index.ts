
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
    console.log('Received webhook event')

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

    // Handle specific event types with enhanced logging and detailed status updates
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log(`Processing completed session: ${session.id}`)
        
        // Update transaction status in database
        const { error } = await supabaseAdmin
          .from('transactions')
          .update({ 
            status: 'completed',
            stripe_payment_intent_id: session.payment_intent as string,
            updated_at: new Date().toISOString()
          })
          .eq('stripe_session_id', session.id)

        if (error) {
          console.error(`Error updating transaction for session ${session.id}:`, error)
          throw error
        }
        console.log(`Successfully marked transaction completed for session ${session.id}`)
        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log(`Processing expired session: ${session.id}`)
        
        const { error } = await supabaseAdmin
          .from('transactions')
          .update({ 
            status: 'expired',
            updated_at: new Date().toISOString()
          })
          .eq('stripe_session_id', session.id)

        if (error) {
          console.error(`Error updating expired transaction for session ${session.id}:`, error)
          throw error
        }
        console.log(`Successfully marked transaction expired for session ${session.id}`)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`Processing failed payment intent: ${paymentIntent.id}`)
        
        const { error } = await supabaseAdmin
          .from('transactions')
          .update({ 
            status: 'failed',
            updated_at: new Date().toISOString()
          })
          .eq('stripe_payment_intent_id', paymentIntent.id)

        if (error) {
          console.error(`Error updating failed transaction for payment intent ${paymentIntent.id}:`, error)
          throw error
        }
        console.log(`Successfully marked transaction failed for payment intent ${paymentIntent.id}`)
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`Processing succeeded payment intent: ${paymentIntent.id}`)
        
        const { error } = await supabaseAdmin
          .from('transactions')
          .update({ 
            status: 'completed',
            updated_at: new Date().toISOString()
          })
          .eq('stripe_payment_intent_id', paymentIntent.id)
          .eq('status', 'pending')

        if (error) {
          console.error(`Error updating succeeded transaction for payment intent ${paymentIntent.id}:`, error)
          throw error
        }
        console.log(`Successfully marked transaction completed for payment intent ${paymentIntent.id}`)
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        console.log(`Processing refund for charge: ${charge.id}`)
        
        if (charge.payment_intent) {
          const { error } = await supabaseAdmin
            .from('transactions')
            .update({ 
              status: 'refunded',
              updated_at: new Date().toISOString()
            })
            .eq('stripe_payment_intent_id', charge.payment_intent as string)

          if (error) {
            console.error(`Error updating refunded transaction for payment intent ${charge.payment_intent}:`, error)
            throw error
          }
          console.log(`Successfully marked transaction refunded for payment intent ${charge.payment_intent}`)
        }
        break
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute
        console.log(`Processing dispute: ${dispute.id}`)
        
        if (dispute.charge && dispute.payment_intent) {
          const { error } = await supabaseAdmin
            .from('transactions')
            .update({ 
              status: 'disputed',
              updated_at: new Date().toISOString()
            })
            .eq('stripe_payment_intent_id', dispute.payment_intent as string)

          if (error) {
            console.error(`Error updating disputed transaction for payment intent ${dispute.payment_intent}:`, error)
            throw error
          }
          console.log(`Successfully marked transaction disputed for payment intent ${dispute.payment_intent}`)
        }
        break
      }

      default: {
        console.log(`Unhandled event type: ${event.type}`)
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
