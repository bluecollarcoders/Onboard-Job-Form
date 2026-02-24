import React, { useState } from "react";
import type { ContactFormData } from "@my-app/shared";

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
    [key: string]: string | undefined;
}

export const ContactForm = () => {
    const [form, setForm] = useState<ContactFormData>({
        name: '',
        email: '',
        message: '',
    });
    
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<'idle' | 'checking' | 'error' | 'success'>('idle');
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm( prev => ({ ...prev, [name]: value }));
    }

    const validate = (values: ContactFormData) => {
        const newErrors: FormErrors = {};

        if ( values.name.length < 3 ) {
            newErrors.name = 'Name must be at least 3 characters.';
        } 

        if ( values.email && !/\S+@\S+\.\S+/.test(values.email)) {
            newErrors.email = 'Please enter valid email address.'
        }

        if ( values.message.length === 0 ) {
            newErrors.message = 'Message field can/t be empty';
        }

        return newErrors;
       
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = e.target;
        setTouched(prev => ({...prev, [name]: true }));

        const allErrors = validate(form);

        setErrors( prev => ({...prev, [name]: allErrors[name] }));
    }

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        const currentErrors = validate(form);
        const isInvalid =  Object.values(currentErrors).some(err => err != undefined );

        setErrors(currentErrors);

        setTouched({
            name: true,
            email: true,
            message: true
        });

        if ( isInvalid )  {
            setStatus('error')
            return;
        }

        // API Call Starts Here.
        setStatus('checking');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if ( !response.ok) {
                throw new Error('Failed to submit form');
            }

            const data = await response.json();
            console.log('Saved to DB:', data);

            setStatus('success');
            setForm({ name: '', email: '', message: ''});
            setTouched({});

        } catch (err) {
            console.error(err);
            setStatus('error');
        }

    }

    return (
        <div className="flex items-center justify-center bg-gray-50 p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md flex flex-col gap-6">
            <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="name-input">Name</label>
            <input 
            id="name-input"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md outline-none transition focus:ring-2 ${
            errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
             }`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined }
            />   
            {touched.name && errors.name && ( <p className="text-xs text-red-600 mt-1" id="name-error">{errors.name}</p>)}
            </div>

            <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="email-input">Email</label> 
            <input
             type="email"
             name="email"
             value={form.email}
             id="email-input"
             onChange={handleChange} 
             onBlur={handleBlur}
             className={`w-full px-3 py-2 border rounded-md outline-none transition focus:ring-2 ${
            errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
             }`}
            />  
            {touched.email && errors.email && ( <p id="email-error">{errors.email}</p>)}
            </div>

            <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="message-input">Message</label> 
            <textarea
            id="message-input"
             name="message"
             value={form.message}
             onChange={handleChange} 
             onBlur={handleBlur}
             className={`w-full px-3 py-2 border rounded-md outline-none transition focus:ring-2 ${
            errors.message ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
             }`}
            /> 
            {touched.message && errors.message && ( <p id="message-error">{errors.message}</p>)}
            </div>
            <button 
            type="submit"
            disabled={status === 'checking' || Object.values(errors).some(err => err != undefined )}
            style={{ cursor: status === 'checking' ? 'not-allowed' : 'pointer'}}
            className="w-full py-3 px-4 rounded-md font-semibold text-black bg-indigo-600 hover:bg-indigo-700 transition"
            >
                {status === 'checking' ? 'Sending...' : 'Submit'}
            </button>

            <div>
            { status === 'success' ? ( <span style={{ color: 'green'}}>Form Submitted!!</span>
            ) : status === 'error' ? (
            <span style={{color: 'red'}}>Fix Error</span>
            ): null }   
            </div>
            
        </form>
         </div>
    );
}


