import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const validationSchema = Yup.object({
    username: Yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
    password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
});
const initialValues = {
    username: '',
    password: '',
};
const submitHandler = async (values: { username: string; password: string }) => {
    try {
    // console.log(values);
    const { username, password } = values;
    const response = await axios.post('https://task-no1-backend.vercel.app/api/user/login',{
        username,
        password
    });
    localStorage.setItem('token', response.data.token);
    // const response = await axios.post('http://localhost:3000/api/user/login',{
    //     username,
    //     password
    // });
    // console.log(response.data);

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error occurred while logging in:', error.response?.data || error.message);
        } else {
            console.error('An unexpected error occurred while logging in:', error);
        }
    }
};
function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-4/12 mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    await submitHandler(values);
                }}
            >
                <Form className="w-full">
                    <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h1>
                    <div className="flex flex-col items-center">
                        <div className="w-full mb-4 flex flex-col">
                            <label htmlFor="username">Username</label>
                            <Field type="text" id="username" name="username" className="border w-full mx-auto border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <div className="text-red-600">
                                <ErrorMessage name="username" />
                            </div>
                        </div>
                        <div className="w-full mb-4 flex flex-col">
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password" className="border w-full mx-auto border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <div className="text-red-600">
                                <ErrorMessage name="password" />
                            </div>
                        </div>
                        <button type="submit" className="bg-blue-500 w-full mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Login
                        </button>
                    </div>
                </Form>
            </Formik>

        </div>
    )
}

export default Login