
import { supabase } from "@/integrations/supabase/client";

const createSuperAdmin = async () => {
  try {
    // Check if super admin already exists
    const { data: { user: existingUser }, error: userError } = await supabase.auth.admin.getUserByEmail('114.adrian.gheorghe@gmail.com');

    if (userError) {
      console.log('Error checking for existing user:', userError.message);
    }

    if (existingUser) {
      console.log('Super admin account already exists');
      
      // Update the user's role if they exist
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        existingUser.id,
        { user_metadata: { role: 'admin' } }
      );
      
      if (updateError) {
        console.error('Error updating role:', updateError);
      } else {
        console.log('Role updated successfully');
      }
      
      return;
    }

    // Create the super admin account
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: "114.adrian.gheorghe@gmail.com",
      password: "Alfasiomega!!!",
      options: {
        data: {
          role: 'admin'
        }
      }
    });

    if (signUpError) {
      throw signUpError;
    }

    if (signUpData?.user) {
      console.log('Super admin account created successfully');
      console.log('Please check your email to confirm the account or disable email confirmation in Supabase dashboard');
    }

  } catch (error) {
    console.error('Error creating super admin:', error);
  }
};

// Execute the function
createSuperAdmin();
