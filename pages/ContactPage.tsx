import React, { useState } from 'react';
type FormStatus = 'idle'|'success'|'error';

const ContactPage: React.FC = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [message,setMessage] = useState('');
  const [status,setStatus] = useState<FormStatus>('idle');
  const [error,setError] = useState('');

  const validateEmail = (e:string)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!name || !email || !message) { setError('الرجاء تعبئة جميع الحقول'); setStatus('error'); return; }
    if (!validateEmail(email))      { setError('صيغة البريد غير صحيحة'); setStatus('error'); return; }
    setStatus('success'); setError('');
    setName(''); setEmail(''); setMessage('');
  };

  return (
    <div className="container bg-white dark:bg-gray-800 p-4 p-md-5 rounded shadow">
      <div className="text-center mb-4">
        <h1 className="display-6">اتصل بنا</h1>
        <p className="text-muted">نحن هنا للإجابة على استفساراتكم.</p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <h2 className="h5 mb-3">أرسل رسالة</h2>
          <form onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-12">
              <label className="form-label" htmlFor="name">الاسم</label>
              <input className="form-control" id="name" value={name} onChange={e=>setName(e.target.value)} />
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="email">البريد الإلكتروني</label>
              <input type="email" className="form-control" id="email" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="message">رسالتك</label>
              <textarea className="form-control" id="message" rows={5} value={message} onChange={e=>setMessage(e.target.value)} />
            </div>
            <div className="col-12">
              <button className="btn btn-primary w-100" type="submit">إرسال</button>
            </div>
          </form>

          {status==='success' && (
            <div className="alert alert-success mt-3" role="alert">
              تم إرسال رسالتك بنجاح! شكرًا لتواصلك معنا.
            </div>
          )}
          {status==='error' && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
        </div>

        <div className="col-12 col-md-6">
          <h2 className="h5 mb-3">معلومات التواصل</h2>
          <p><strong>البريد العام:</strong> info@svuevents.com</p>
          <p><strong>حساباتنا:</strong> @SVUEvents على جميع المنصات</p>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;
