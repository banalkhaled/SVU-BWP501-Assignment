
import React, { useState } from 'react';
import { useEvents } from '../contexts/EventsContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Event, EventCategory } from '../types';
import { generateEventDescription } from '../services/geminiService';

const AdminDashboardPage: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<Event> | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const openModal = (event: Partial<Event> | null = null) => {
    setCurrentEvent(event ? { ...event } : { title: '', category: EventCategory.Culture, location: '', event_date: '', description: '', short_description: '', image: 'https://picsum.photos/seed/new/600/400' });
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!currentEvent) return;
    const { name, value } = e.target;
    setCurrentEvent({ ...currentEvent, [name]: value });
  };
  
  const handleGenerateDescription = async () => {
    if (!currentEvent || !currentEvent.title || !currentEvent.category) return;
    setIsGenerating(true);
    try {
      const description = await generateEventDescription(currentEvent.title, currentEvent.category);
      setCurrentEvent(prev => prev ? {...prev, description, short_description: description.substring(0, 100) + '...'} : null);
    } catch(e) {
        console.error(e);
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEvent || !currentEvent.title) return;

    if (currentEvent.id) {
      updateEvent(currentEvent as Event);
    } else {
      addEvent(currentEvent as Omit<Event, 'id'>);
    }
    closeModal();
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">لوحة تحكم الفعاليات</h1>
        <div>
          <button onClick={() => openModal()} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors me-4">إضافة فعالية</button>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">تسجيل الخروج</button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">العنوان</th>
              <th scope="col" className="px-6 py-3">الفئة</th>
              <th scope="col" className="px-6 py-3">التاريخ</th>
              <th scope="col" className="px-6 py-3">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{event.title}</td>
                <td className="px-6 py-4">{event.category}</td>
                <td className="px-6 py-4">{new Date(event.event_date).toLocaleDateString('ar-SA')}</td>
                <td className="px-6 py-4 space-x-2 space-x-reverse">
                  <button onClick={() => openModal(event)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">تعديل</button>
                  <button onClick={() => deleteEvent(event.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && currentEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">{currentEvent.id ? 'تعديل فعالية' : 'إضافة فعالية جديدة'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form fields */}
              <div><label>العنوان</label><input name="title" value={currentEvent.title} onChange={handleFormChange} className="w-full p-2 border rounded-md dark:bg-gray-700" required /></div>
              <div><label>الفئة</label><select name="category" value={currentEvent.category} onChange={handleFormChange} className="w-full p-2 border rounded-md dark:bg-gray-700"><option disabled>اختر فئة</option>{Object.values(EventCategory).map(c => <option key={c} value={c}>{c}</option>)}</select></div>
              <div><label>الموقع</label><input name="location" value={currentEvent.location} onChange={handleFormChange} className="w-full p-2 border rounded-md dark:bg-gray-700" required /></div>
              <div><label>التاريخ والوقت</label><input type="datetime-local" name="event_date" value={currentEvent.event_date?.substring(0,16)} onChange={handleFormChange} className="w-full p-2 border rounded-md dark:bg-gray-700" required /></div>
              <div><label>رابط الصورة</label><input name="image" value={currentEvent.image} onChange={handleFormChange} className="w-full p-2 border rounded-md dark:bg-gray-700" required /></div>
              
               <div className="relative">
                <label>الوصف الكامل</label>
                <textarea name="description" value={currentEvent.description} onChange={handleFormChange} rows={5} className="w-full p-2 border rounded-md dark:bg-gray-700" required />
                <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="absolute top-8 left-2 bg-secondary text-gray-800 px-2 py-1 rounded text-xs hover:bg-secondary-dark disabled:opacity-50">
                    {isGenerating ? 'جاري الإنشاء...' : 'إنشاء بالذكاء الاصطناعي'}
                </button>
              </div>

              <div><label>الوصف القصير</label><textarea name="short_description" value={currentEvent.short_description} onChange={handleFormChange} rows={2} className="w-full p-2 border rounded-md dark:bg-gray-700" required /></div>
              
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md">{currentEvent.id ? 'حفظ التعديلات' : 'إضافة الفعالية'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
