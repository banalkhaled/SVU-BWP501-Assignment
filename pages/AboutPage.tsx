
import React from 'react';
import { PARTICIPANTS } from '../constants';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary dark:text-primary-light">عن دليل فعاليات المدينة</h1>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary pb-2">هدفنا ورؤيتنا</h2>
        <p className="text-lg leading-relaxed">
          يهدف "دليل فعاليات المدينة" إلى أن يكون المصدر الأول والشامل لكل من يبحث عن الأنشطة والفعاليات في مدينتنا. نسعى لجمع وتنظيم كافة الأحداث الثقافية، الرياضية، الترفيهية، والاجتماعية في منصة واحدة سهلة الاستخدام، مما يساهم في إثراء الحياة الاجتماعية والثقافية للسكان والزوار على حد سواء. رؤيتنا هي بناء مجتمع أكثر ترابطًا وتفاعلًا من خلال تسهيل الوصول إلى المعلومات حول الفعاليات المحلية.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary pb-2">فريق العمل</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PARTICIPANTS.map((participant, index) => (
            <div key={participant.id} className="text-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <img 
                src={`https://picsum.photos/seed/person${index}/200/200`}
                alt={participant.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary"
              />
              <h3 className="text-xl font-semibold">{participant.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{participant.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary pb-2">سياسات تقديم الفعاليات</h2>
        <p className="text-lg leading-relaxed">
          نرحب بمنظمي الفعاليات لإضافة أحداثهم إلى دليلنا. لضمان جودة المحتوى، نرجو الالتزام بالسياسات التالية: يجب أن تكون الفعالية مفتوحة للجمهور، ويجب تقديم معلومات كاملة ودقيقة، بما في ذلك التاريخ، الوقت، المكان، ووصف واضح. يحتفظ فريقنا بحق مراجعة وتعديل أو رفض أي فعالية لا تتوافق مع معاييرنا.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
