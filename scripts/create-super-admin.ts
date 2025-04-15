
import { supabase } from "@/integrations/supabase/client";

const createSuperAdmin = async () => {
  try {
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

    console.log('Super admin account created successfully:', signUpData);

  } catch (error) {
    console.error('Error creating super admin:', error);
  }
};

createSuperAdmin();
