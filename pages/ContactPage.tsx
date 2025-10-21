
import React, { useState } from 'react';

type FormStatus = 'idle' | 'success' | 'error';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStatus('idle');

    if (!name || !email || !message) {
      setError('يرجى ملء جميع الحقول المطلوبة.');
      setStatus('error');
      return;
    }
    if (!validateEmail(email)) {
      setError('الرجاء إدخال عنوان بريد إلكتروني صالح.');
      setStatus('error');
      return;
    }

    // Simulate form submission
    console.log({ name, email, message });
    setStatus('success');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">اتصل بنا</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">نحن هنا للإجابة على استفساراتكم واقتراحاتكم.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">أرسل رسالة</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">الاسم</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
              <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-1">رسالتك</label>
              <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={5} required className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary"></textarea>
            </div>
            <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors">إرسال</button>
          </form>
          {status === 'success' && (
            <div className="mt-4 p-4 text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-200 border border-green-300 rounded-md">
              تم إرسال رسالتك بنجاح! شكرًا لتواصلك معنا.
            </div>
          )}
          {status === 'error' && (
             <div className="mt-4 p-4 text-red-800 bg-red-100 dark:bg-red-900 dark:text-red-200 border border-red-300 rounded-md">
              {error}
            </div>
          )}
        </div>

        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">معلومات التواصل</h2>
            <div className="flex items-start gap-4">
                <p><strong>البريد العام:</strong> info@svuevents.com</p>
            </div>
            <div className="flex items-start gap-4">
                <p><strong>حساباتنا:</strong> @SVUEvents على جميع المنصات</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
