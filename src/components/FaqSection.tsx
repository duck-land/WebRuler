'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaQuestionCircle, FaChevronDown } from 'react-icons/fa';

interface FaqItem {
    q: string;
    a: string;
}

const I18N_FAQ: Record<string, { badge: string; title: string; subtitle: string; items: FaqItem[] }> = {
    ko: {
        badge: '자주 묻는 질문',
        title: '자주 묻는 질문 (FAQ)',
        subtitle: '온라인 자 사용법, PPI 캘리브레이션, 정확도에 대한 대표적인 궁금증을 해결해 드립니다.',
        items: [
            {
                q: '온라인 자(RulerHero)는 어떻게 디스플레이에서 정확한 센티미터(cm)를 측정하나요?',
                a: 'RulerHero는 디지털 디스플레이의 픽셀 밀도(PPI, Pixels Per Inch)를 기준으로 화면의 물리적 크기를 계산합니다. 신용카드(표준 85.60mm)를 화면에 대고 보정하거나 모니터 인치 수를 입력하면, 브라우저가 화면 픽셀 비율을 완벽하게 동기화하여 실제 자와 100% 동일한 길이를 표시합니다.'
            },
            {
                q: '신용카드 이외에 다른 물체로 캘리브레이션을 할 수 있나요?',
                a: '네, 표준 규격의 신용카드, 체크카드, 운전면허증, 주민등록증은 모두 국제 표준(ISO/IEC 7810)에 따라 가로 85.60mm로 동일합니다. 또한 사용 중이신 모니터의 대각선 크기(예: 24인치, 27인치)를 직접 입력하여 보정하실 수도 있습니다.'
            },
            {
                q: '브라우저 화면 비율(Zoom)이 측정 정확도에 영향을 주나요?',
                a: '네, 그렇습니다. 웹 브라우저의 화면 확대/축소 비율이 100%가 아닐 경우, 픽셀 렌더링 배율이 변경되어 측정 오차가 발생할 수 있습니다. 키보드의 Ctrl + 0 (Mac은 Cmd + 0)을 눌러 브라우저 줌을 100%로 초기화한 후 사용하시기를 권장합니다.'
            },
            {
                q: '스마트폰이나 태블릿 모바일 기기에서도 사용할 수 있나요?',
                a: 'RulerHero는 완전 반응형으로 설계되어 스마트폰(iOS, Android)과 태블릿에서도 동일하게 작동합니다. 터치스크린 위에서 손가락 드래그를 통해 간편하게 마커를 조절하고 물체 길이를 측정할 수 있습니다.'
            },
            {
                q: '측정 기록 및 보정 설정 정보는 서버에 저장되나요?',
                a: '아닙니다. RulerHero는 사용자의 개인정보를 보호하기 위해 어떠한 측정 데이터나 보정 수치도 서버로 전송하지 않습니다. 모든 캘리브레이션 데이터는 사용자의 브라우저 로컬 저장소(LocalStorage)에 안전하게 보관됩니다.'
            },
            {
                q: '센티미터(cm), 밀리미터(mm), 인치(inch) 단위를 변경하는 방법은 무엇인가요?',
                a: '상단의 단축 버튼 또는 [자 실행하기] 화면 내의 설정 탭에서 클릭 한 번으로 cm/mm 및 inch 단위를 자유롭게 전환하실 수 있습니다.'
            }
        ]
    },
    en: {
        badge: 'FREQUENTLY ASKED QUESTIONS',
        title: 'Frequently Asked Questions',
        subtitle: 'Find answers to common questions about online screen rulers, PPI calibration, and measurement accuracy.',
        items: [
            {
                q: 'How does an online ruler measure actual centimeters and inches on my screen?',
                a: 'RulerHero calculates physical dimensions based on your display\'s pixel density (PPI). By calibrating against a standard credit card (85.60 mm) or entering your monitor size, the browser matches screen pixels directly to real-world measurements with 100% accuracy.'
            },
            {
                q: 'Can I use items other than a credit card to calibrate the ruler?',
                a: 'Yes! Any standard credit card, debit card, or driver\'s license strictly follows the ISO/IEC 7810 ID-1 standard (85.60 mm width). Alternatively, you can directly enter your screen diagonal size (e.g. 24-inch or 27-inch).'
            },
            {
                q: 'Does my browser zoom level affect measurement accuracy?',
                a: 'Yes. Browser zoom settings change screen pixel scaling. Ensure your browser zoom level is set to 100% by pressing Ctrl + 0 (or Cmd + 0 on Mac) before calibrating or measuring.'
            },
            {
                q: 'Can I use this screen ruler on smartphones and tablets?',
                a: 'Absolutely! RulerHero is fully mobile-responsive. Simply place an object on your touchscreen screen and drag the color-coded markers with your finger.'
            },
            {
                q: 'Is my calibration data or measurement history stored on a server?',
                a: 'No. RulerHero respects user privacy and does not send measurement data to any server. Your PPI settings are stored locally in your browser\'s LocalStorage.'
            },
            {
                q: 'How do I toggle between Centimeters (cm) and Inches (in)?',
                a: 'You can instantly switch between cm/mm and inches with one tap inside the measurement page controls.'
            }
        ]
    },
    zh: {
        badge: '常见问题',
        title: '常见问题解答 (FAQ)',
        subtitle: '了解有关在线屏幕尺、PPI 校准和测量精度的常见解答。',
        items: [
            {
                q: '在线尺如何准确测量屏幕上的厘米和英寸？',
                a: 'RulerHero 根据您显示屏的像素密度 (PPI) 计算物理尺寸。通过对照标准信用卡 (85.60 mm) 校准或输入显示器尺寸，浏览器能将屏幕像素与真实尺寸 100% 精确匹配。'
            },
            {
                q: '可以使用信用卡以外的物品进行校准吗？',
                a: '可以！任何标准信用卡、借记卡或驾照均符合 ISO/IEC 7810 标准（宽度 85.60 mm）。此外也可以直接输入显示器的对角线尺寸（如 24 英寸或 27 英寸）。'
            },
            {
                q: '浏览器缩放比例会影响测量精度吗？',
                a: '会的。浏览器缩放会改变像素渲染比例。建议按下 Ctrl + 0 (Mac 为 Cmd + 0) 将浏览器缩放重置为 100%。'
            },
            {
                q: '可以在智能手机或平板电脑上使用吗？',
                a: '完全可以！RulerHero 采用响应式设计。只需将物品放在触摸屏上，用手指拖动标记线即可测量。'
            },
            {
                q: '校准数据或测量记录会上传至服务器吗？',
                a: '不会。RulerHero 重视隐私，不会上传任何数据。所有 PPI 校准数据均保存在本地 LocalStorage 中。'
            },
            {
                q: '如何切换厘米 (cm) 与英寸 (inch)？',
                a: '在测量页面的控制面板中点击一次即可随时切换 cm/mm 与 inch 单位。'
            }
        ]
    },
    ja: {
        badge: 'よくある質問',
        title: 'よくある質問 (FAQ)',
        subtitle: 'オンライン画面定規の使い方、PPIキャリブレーション、測定精度に関する疑問にお答えします。',
        items: [
            {
                q: 'オンライン定規はどのようにして画面上で正確なcmやinchを測定するのですか？',
                a: 'RulerHeroはディスプレイのピクセル密度（PPI）を基準に実寸を計算します。標準クレジットカード（85.60mm）またはモニターサイズで補正することで、実物の定規と100%一致する長さを示します。'
            },
            {
                q: 'クレジットカード以外の物でキャリブレーションできますか？',
                a: 'はい！一般的なクレジットカード、キャッシュカード、運転免許証は国際規格（ISO/IEC 7810）に基づき横幅85.60mmで統一されています。またモニターの対角インチ数を直接入力して補正することも可能です。'
            },
            {
                q: 'ブラウザのズーム倍率は測定精度に影響しますか？',
                a: 'はい。倍率が100%でない場合、ピクセル描画倍率が変化し誤差が生じます。Ctrl + 0（MacはCmd + 0）でズームを100%にしてご利用ください。'
            },
            {
                q: 'スマートフォンやタブレットでも利用できますか？',
                a: 'もちろんです！レスポンシブ対応によりスマホやタブレットのタッチパネル上でもドラッグ操作で直感的に測定できます。'
            },
            {
                q: '測定記録や校正データはサーバーに保存されますか？',
                a: 'いいえ。プライバシー保護のため、測定データは一切サーバーへ送信されません。データはブラウザのLocalStorageにのみ保存されます。'
            },
            {
                q: 'センチメートル(cm)とインチ(inch)の切替方法は？',
                a: '測定画面のコントロールパネルからワンタップでcm/mmとinch単位を切り替えられます。'
            }
        ]
    },
    es: {
        badge: 'PREGUNTAS FRECUENTES',
        title: 'Preguntas Frecuentes (FAQ)',
        subtitle: 'Respuestas a preguntas comunes sobre reglas en pantalla, calibración PPI y precisión.',
        items: [
            {
                q: '¿Cómo mide una regla en línea centímetros y pulgadas reales en mi pantalla?',
                a: 'RulerHero calcula las dimensiones físicas basándose en la densidad de píxeles (PPI) de su pantalla. Calibrando con una tarjeta estándar (85.60 mm) o ingresando el tamaño del monitor, el navegador iguala los píxeles con la realidad.'
            },
            {
                q: '¿Puedo usar objetos distintos a una tarjeta de crédito para calibrar?',
                a: '¡Sí! Cualquier tarjeta de crédito, débito o licencia de conducir sigue el estándar ISO/IEC 7810 (85.60 mm). También puede ingresar el tamaño diagonal de su pantalla.'
            },
            {
                q: '¿Afecta el nivel de zoom del navegador a la precisión?',
                a: 'Sí. El zoom cambia la escala de píxeles. Asegúrese de ajustar el zoom al 100% presionando Ctrl + 0 (Cmd + 0 en Mac).'
            },
            {
                q: '¿Puedo usar esta regla en smartphones y tabletas?',
                a: '¡Absolutamente! RulerHero es totalmente adaptable. Coloque un objeto sobre su pantalla táctil y arrastre los marcadores.'
            },
            {
                q: '¿Se guardan mis datos de calibración en un servidor?',
                a: 'No. RulerHero no envía ningún dato a servidores externos. Sus datos se guardan localmente en su navegador.'
            },
            {
                q: '¿Cómo cambio entre centímetros (cm) y pulgadas (in)?',
                a: 'Puede alternar al instante entre cm/mm y pulgadas desde el panel de control.'
            }
        ]
    },
    hi: {
        badge: 'अक्सर पूछे जाने वाले प्रश्न',
        title: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
        subtitle: 'ऑनलाइन रूलर, PPI कैलिब्रेशन और मापन सटीकता के बारे में अक्सर पूछे जाने वाले प्रश्नों के उत्तर।',
        items: [
            {
                q: 'ऑनलाइन रूलर स्क्रीन पर सटीक सेंटीमीटर और इंच कैसे मापता है?',
                a: 'RulerHero आपकी स्क्रीन की पिक्सेल घनत्व (PPI) के आधार पर भौतिक आयामों की गणना करता है। मानक क्रेडिट कार्ड (85.60 मिमी) या मॉनिटर आकार के साथ कैलिब्रेट करके, यह 100% सटीकता प्रदान करता है।'
            },
            {
                q: 'क्या मैं कैलिब्रेट करने के लिए क्रेडिट कार्ड के अलावा अन्य वस्तुओं का उपयोग कर सकता हूं?',
                a: 'हाँ! कोई भी मानक क्रेडिट कार्ड या ड्राइविंग लाइसेंस ISO/IEC 7810 मानक (85.60 मिमी) का पालन करता है। आप अपनी स्क्रीन का आकार भी दर्ज कर सकते हैं।'
            },
            {
                q: 'क्या ब्राउज़र ज़ूम स्तर सटीकता को प्रभावित करता है?',
                a: 'हाँ। मापन से पहले Ctrl + 0 दबाकर ज़ूम स्तर 100% पर सेट करें।'
            },
            {
                q: 'क्या मैं इसे स्मार्टफोन और टैबलेट पर उपयोग कर सकता हूं?',
                a: 'बिल्कुल! RulerHero मोबाइल पर पूरी तरह से काम करता है। बस टचस्क्रीन पर वस्तु रखें और मार्कर खींचें।'
            },
            {
                q: 'क्या मेरा डेटा सर्वर पर सहेजा जाता है?',
                a: 'नहीं। सभी कैलिब्रेशन डेटा आपके ब्राउज़र के LocalStorage में सुरक्षित रहता है।'
            },
            {
                q: 'सेंटीमीटर (cm) और इंच (in) के बीच कैसे बदलें?',
                a: 'आप मापन पृष्ठ पर एक टैप से इकाई बदल सकते हैं।'
            }
        ]
    },
    fr: {
        badge: 'FOIRE AUX QUESTIONS',
        title: 'Foire Aux Questions (FAQ)',
        subtitle: 'Réponses aux questions fréquentes sur la règle sur écran, l\'étalonnage PPI et la précision.',
        items: [
            {
                q: 'Comment une règle en ligne mesure-t-elle des centimètres et pouces réels sur mon écran ?',
                a: 'RulerHero calcule les dimensions physiques en fonction de la densité de pixels (PPI) de votre écran. En calibrant avec une carte bancaire (85,60 mm) ou la taille d\'écran, la mesure correspond à 100% au réel.'
            },
            {
                q: 'Puis-je utiliser un objet autre qu\'une carte de crédit pour étalonner ?',
                a: 'Oui ! Toute carte bancaire ou permis de conduire respecte la norme ISO/IEC 7810 (85,60 mm). Vous pouvez aussi entrer la taille diagonale de votre écran.'
            },
            {
                q: 'Le niveau de zoom du navigateur affecte-t-il la précision ?',
                a: 'Oui. Assurez-vous de réinitialiser le zoom à 100% en appuyant sur Ctrl + 0 (Cmd + 0 sur Mac).'
            },
            {
                q: 'Puis-je l\'utiliser sur smartphone et tablette ?',
                a: 'Absolument ! RulerHero est entièrement adaptatif. Placez un objet sur l\'écran tactile et faites glisser les repères.'
            },
            {
                q: 'Mes données d\'étalonnage sont-elles enregistrées sur un serveur ?',
                a: 'Non. Vos réglages sont conservés localement dans le LocalStorage de votre navigateur.'
            },
            {
                q: 'Comment basculer entre centimètres (cm) et pouces (in) ?',
                a: 'Vous pouvez basculer d\'une touche entre cm/mm et pouces dans les commandes.'
            }
        ]
    },
    ar: {
        badge: 'الأسئلة الشائعة',
        title: 'الأسئلة الشائعة (FAQ)',
        subtitle: 'إجابات على الأسئلة الشائعة حول المسطرة الرقمية ومعايرة PPI والدقة.',
        items: [
            {
                q: 'كيف تقيس المسطرة الرقمية السنتيمترات والبوصات الفعلية على الشاشة؟',
                a: 'تحسب RulerHero الأبعاد بناءً على كثافة البكسل (PPI). من خلال الضبط ببطاقة ائتمان (85.60 ملم) أو حجم الشاشة، تتطابق البكسلات مع المقاس الحقيقي بنسبة 100%.'
            },
            {
                q: 'هل يمكنني استخدام شيء آخر غير بطاقة الائتمان للمعايرة؟',
                a: 'نعم! أي بطاقة ائتمان أو رخصة قيادة تتبع معيار ISO/IEC 7810 (85.60 ملم). كما يمكنك إدخال حجم الشاشة بالبوصة.'
            },
            {
                q: 'هل يؤثر التكبير في المتصفح على دقة القياس؟',
                a: 'نعم. يرجى إعادة ضبط تكبير المتصفح إلى 100% بالضغط على Ctrl + 0 (أو Cmd + 0 على Mac).'
            },
            {
                q: 'هل يمكنني استخدام المسطرة على الهواتف الذكية والأجهزة اللوحية؟',
                a: 'بالتأكيد! RulerHero متوافق مع الجوال تماماً. ضع الشيء على الشاشة واسحب العلامات.'
            },
            {
                q: 'هل تُحفظ بيانات المعايرة على خادم؟',
                a: 'لا. تُحفظ بياناتك محلياً في LocalStorage الخاص بمتصفحك فقط.'
            },
            {
                q: 'كيف أبدل بين السنتيمترات (cm) والبوصات (in)؟',
                a: 'يمكنك التبديل بين الوحدات بنقرة واحدة داخل صفحة القياس.'
            }
        ]
    },
    ru: {
        badge: 'ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ',
        title: 'Часто Задаваемые Вопросы (FAQ)',
        subtitle: 'Ответы на популярные вопросы об онлайн линейке, калибровке PPI и точности измерений.',
        items: [
            {
                q: 'Как онлайн линейка точно измеряет сантиметры и дюймы на экране?',
                a: 'RulerHero рассчитывает физические размеры на основе плотности пикселей (PPI) вашего экрана. Калибровка по банковской карте (85.60 мм) или размеру монитора обеспечивает 100% точность.'
            },
            {
                q: 'Можно ли использовать другие предметы для калибровки вместо карты?',
                a: 'Да! Любая банковская карта или водительские права соответствуют стандарту ISO/IEC 7810 (85.60 мм). Также можно ввести диагональ экрана.'
            },
            {
                q: 'Влияет ли масштаб браузера на точность измерений?',
                a: 'Да. Убедитесь, что масштаб браузера установлен на 100% (сочетание клавиш Ctrl + 0 или Cmd + 0 на Mac).'
            },
            {
                q: 'Можно ли использовать линейку на смартфоне или планшете?',
                a: 'Конечно! RulerHero адаптирована для мобильных устройств. Положите предмет на экран и перемещайте маркеры пальцем.'
            },
            {
                q: 'Сохраняются ли данные калибровки на сервере?',
                a: 'Нет. Все настройки PPI сохраняются исключительно в вашем браузере (LocalStorage).'
            },
            {
                q: 'Как переключиться между сантиметрами (см) и дюймами (in)?',
                a: 'Переключение между см/мм и дюймами выполняется в один клик في панели управления.'
            }
        ]
    }
};

export default function FaqSection() {
    const { language } = useLanguage();
    const tSection = I18N_FAQ[language] || I18N_FAQ.en;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" style={{ padding: '6rem 0', background: 'var(--surface)' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.4rem 1rem',
                        borderRadius: '20px',
                        background: 'rgba(168, 85, 247, 0.1)',
                        color: '#a855f7',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        marginBottom: '1rem'
                    }}>
                        <FaQuestionCircle />
                        <span>{tSection.badge}</span>
                    </div>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        marginBottom: '1rem',
                        background: 'linear-gradient(to right, #fff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {tSection.title}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        {tSection.subtitle}
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {tSection.items.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="glass-panel"
                                style={{
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    border: isOpen ? '1px solid var(--primary)' : '1px solid var(--border)',
                                    transition: 'border-color 0.2s'
                                }}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    style={{
                                        width: '100%',
                                        padding: '1.25rem 1.5rem',
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#fff',
                                        textAlign: 'left',
                                        fontSize: '1.05rem',
                                        fontWeight: 600,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        gap: '1rem'
                                    }}
                                >
                                    <span>{faq.q}</span>
                                    <FaChevronDown style={{
                                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s',
                                        color: isOpen ? 'var(--primary)' : 'var(--text-muted)',
                                        flexShrink: 0
                                    }} />
                                </button>

                                {isOpen && (
                                    <div style={{
                                        padding: '0 1.5rem 1.25rem 1.5rem',
                                        color: 'var(--text-muted)',
                                        fontSize: '0.95rem',
                                        lineHeight: 1.7,
                                        borderTop: '1px solid rgba(255,255,255,0.05)',
                                        paddingTop: '1rem'
                                    }}>
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
