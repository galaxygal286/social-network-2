import {Link, useNavigate} from "react-router"
import Alert from '../components/Alert.tsx'
import Input from '../components/Input.tsx'
import {Formik,Form} from 'formik'
import * as Yup from 'yup';
import useAuthStore from "../store/authStore"
import { useEffect } from "react";
import NexIcon from "../components/NexIcon.tsx";

const validationSchema=Yup.object({
    name:Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

const RegisterPage=()=>{

    const {register, authenticated, error, clearError} = useAuthStore()
    const navigate = useNavigate();

    useEffect(() => {
        if (authenticated) {
          navigate('/home');
        }
      }, [authenticated, navigate]);

    return <>
        <div className="min-h-screen flex items-center justify-center bg-ultraLight py-12 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
                <div className="flex justify-center pb-6">
                    <Link to="/" className="w-full h-full max-w-20 max-h-20">
                        <NexIcon className="w-full h-full"/>
                    </Link>
                </div>
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create a new account
                    </h2>
                    <p className="mt-2 text-center text-gray-600">
                        <span>Or </span>
                        <Link to="/login" className=" text-primary hover:text-primary-dark">
                            sign in to your account
                        </Link>
                    </p>
                </div>
                
                <Formik
                    initialValues={{
                        name:'',
                        email: '',
                        password:''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        const success=await register(values)
                        if(success){
                            navigate('/login', {
                                state: { successMessage: 'Your account has been created successfully. Please log in.' }
                              });
                        }
                    }}
                >
                <Form className="mt-8 space-y-5" >
                    <Input
                        name="name"
                        type="text"
                        label="Name"
                    />
                    <Input
                        name="email"
                        type="email"
                        label="Email"
                    />
                    <Input
                        name="password"
                        type="password"
                        label="Password"
                    />
                
                <button 
                    className="block w-full rounded bg-blue-600 px-3 py-1.5 font-semibold text-white shadow-xs hover:bg-blue-500 cursor-pointer" 
                    type="submit"
                    >
                        Sign up
                    </button>
                </Form>
                </Formik>
                {error && (
                    <Alert
                        type="error"
                        message={error}
                        onClose={clearError}
                    />
                )}
            </div>
        </div>
    </>
}

export default RegisterPage