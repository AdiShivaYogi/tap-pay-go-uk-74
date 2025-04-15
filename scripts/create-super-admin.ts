
import { supabase } from "@/integrations/supabase/client";

const createSuperAdmin = async () => {
  try {
    // First check if the user already exists
    const { data: existingUsers, error: userError } = await supabase
      .from('auth.users')
      .select('email')
      .eq('email', '114.adrian.gheorghe@gmail.com')
      .limit(1);

    if (userError) {
      console.log('Error checking for existing user:', userError.message);
    }

    if (existingUsers && existingUsers.length > 0) {
      console.log('Super admin account already exists. Attempting to update role...');
      
      // Update the user's role if they exist
      const { error: updateError } = await supabase.auth.updateUser({
        data: { role: 'admin' }
      });
      
      if (updateError) {
        console.error('Error updating role:', updateError);
      } else {
        console.log('Role updated successfully');
      }
      
      return;
    }

    // Use direct sign-up method instead of admin.createUser
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: "114.adrian.gheorghe@gmail.com",
      password: "Alfasiomega!!!",
      options: {
        data: {
          role: 'admin'
        },
        emailRedirectTo: window.location.origin,
      }
    });

    if (signUpError) {
      throw signUpError;
    }

    // Try to auto-confirm the user (this only works in development if auto-confirm is enabled)
    if (signUpData?.user) {
      console.log('Super admin account created:', signUpData.user.email);
      console.log('IMPORTANT: You need to do one of the following:');
      console.log('1. Go to Supabase dashboard > Authentication > Users and confirm the email manually');
      console.log('2. Or disable email confirmation in Supabase dashboard > Authentication > Email');
      console.log('   Then try logging in again with the super admin credentials');
      
      // Try to sign in immediately (will only work if email confirmation is disabled)
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: "114.adrian.gheorghe@gmail.com",
          password: "Alfasiomega!!!"
        });
        
        if (error) {
          console.log('Could not auto-sign in:', error.message);
        } else if (data.user) {
          console.log('Successfully signed in as super admin!');
        }
      } catch (signInError) {
        console.error('Error during auto sign-in:', signInError);
      }
    }

  } catch (error) {
    console.error('Error creating super admin:', error);
  }
};

// Execute the function
createSuperAdmin();
