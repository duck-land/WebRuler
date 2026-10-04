export interface GuideArticle {
    slug: string;
    title: { [key: string]: string };
    summary: { [key: string]: string };
    category: { [key: string]: string };
    date: string;
    readTime: string;
    content: { [key: string]: string };
}

export const GUIDES_DATA: GuideArticle[] = [
    {
        slug: "ppi-guide",
        date: "2026-08-14",
        readTime: "5 min read",
        category: {
            ko: "디스플레이 기술",
            en: "Display Technology",
            zh: "显示技术",
            ja: "ディスプレイ技術",
            es: "Tecnología de Display",
            hi: "डिस्प्ले तकनीक",
            fr: "Technologie d'Affichage",
            ar: "تقنية الشاشة",
            ru: "Технологии Дисплея"
        },
        title: {
            ko: "화면 크기(PPI)와 픽셀 밀도 계측법 완벽 가이드",
            en: "Complete Guide to Screen PPI & Pixel Density Calculation",
            zh: "屏幕 PPI 与像素密度计算完整指南",
            ja: "画面PPIとピクセル密度の計算完全ガイド",
            es: "Guía Completa sobre PPI de Pantalla y Cálculo de Densidad de Píxeles",
            hi: "स्क्रीन PPI और पिक्सेल घनत्व गणना की पूरी गाइड",
            fr: "Guide Complet sur le PPI d'Écran et le Calcul de Densité de Pixels",
            ar: "الدليل الكامل لحساب PPI وتكثيف البكسل للشاشة",
            ru: "Полное руководство по расчету PPI и плотности пикселей экрана"
        },
        summary: {
            ko: "모니터, 노트북, 스마트폰 화면에서 물리적 센티미터와 픽셀 수치의 관계, PPI 계산 공식 및 기기별 밀도표를 알아봅니다.",
            en: "Learn the relationship between physical centimeters and pixel counts across monitors, laptops, and smartphones with PPI formulas and device tables.",
            zh: "了解显示器、笔记本电脑和智能手机屏幕上物理厘米与像素数量之间的关系，掌握 PPI 计算公式与各设备密度表。",
            ja: "モニター、ノートPC、スマホの画面における実サイズ(cm)とピクセル数の関係、PPI計算公式およびデバイス別密度表を解説します。",
            es: "Aprenda la relación entre centímetros físicos y recuento de píxeles en monitores, portátiles y teléfonos con fórmulas PPI y tablas.",
            hi: "मॉनिटर, लैपटॉप और स्मार्टफोन की स्क्रीन पर भौतिक सेंटीमीटर और पिक्सेल संख्या के संबंध, PPI सूत्र और डिवाइस टेबल जानें।",
            fr: "Découvrez la relation entre centimètres physiques et nombre de pixels sur écrans, ordinateurs et smartphones avec les formules PPI.",
            ar: "تعلم العلاقة بين السنتيمترات الفعالية وعدد البكسلات على الشاشات وأجهزة الكمبيوتر والجوالات مع معادلات PPI.",
            ru: "Узнайте соотношение между физическими сантиметрами и пикселями на экранах мониторов, ноутбуков и смартфонов."
        },
        content: {
            ko: `
                <h2>1. PPI(Pixels Per Inch)란 무엇인가요?</h2>
                <p>PPI(Pixels Per Inch)는 디스플레이 화면의 1인치(2.54cm) 대각선 공간 안에 몇 개의 픽셀이 들어있는지를 나타내는 픽셀 밀도 단위입니다. 동일한 Full HD(1920×1080) 해상도라 하더라도 24인치 모니터와 15.6인치 노트북 화면은 물리적 픽셀 크기가 다릅니다.</p>
                <p>따라서 브라우저상에서 실물 크기의 자(Online Ruler)를 정확하게 표시하기 위해서는 사용 중인 디스플레이의 정확한 PPI 값이 필수적으로 요구됩니다.</p>

                <h2>2. PPI 계산 공식과 수학적 원리</h2>
                <p>화면의 가로 픽셀 수를 <em>w</em>, 세로 픽셀 수를 <em>h</em>, 화면 대각선 크기(인치)를 <em>d</em>라고 할 때, PPI 계산 공식은 다음과 같습니다:</p>
                <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; font-family: monospace; text-align: center; margin: 1.5rem 0;">
                    PPI = √(w² + h²) / d
                </div>
                <p>예를 들어 24인치 Full HD (1920 × 1080) 모니터의 경우:</p>
                <ul>
                    <li>대각선 픽셀 수 = √(1920² + 1080²) = √(3,686,400 + 1,166,400) = √4,852,800 ≈ 2202.9 픽셀</li>
                    <li>PPI = 2202.9 / 24 ≈ <strong>91.79 PPI</strong></li>
                </ul>

                <h2>3. 주요 기기별 표준 PPI 및 디스플레이 특성표</h2>
                <table style="width:100%; border-collapse: collapse; margin: 1.5rem 0; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border); color: #fff;">
                            <th style="padding: 0.8rem;">기기 유형</th>
                            <th style="padding: 0.8rem;">화면 크기</th>
                            <th style="padding: 0.8rem;">해상도</th>
                            <th style="padding: 0.8rem;">평균 PPI</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">데스크탑 모니터</td>
                            <td style="padding: 0.8rem;">24 인치</td>
                            <td style="padding: 0.8rem;">1920 × 1080 (FHD)</td>
                            <td style="padding: 0.8rem;">~92 PPI</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">데스크탑 모니터</td>
                            <td style="padding: 0.8rem;">27 인치</td>
                            <td style="padding: 0.8rem;">2560 × 1440 (QHD)</td>
                            <td style="padding: 0.8rem;">~109 PPI</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">노트북 (MacBook Air)</td>
                            <td style="padding: 0.8rem;">13.6 인치</td>
                            <td style="padding: 0.8rem;">2560 × 1664 (Retina)</td>
                            <td style="padding: 0.8rem;">~224 PPI</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">스마트폰 (iPhone 15)</td>
                            <td style="padding: 0.8rem;">6.1 인치</td>
                            <td style="padding: 0.8rem;">2556 × 1179</td>
                            <td style="padding: 0.8rem;">~460 PPI</td>
                        </tr>
                    </tbody>
                </table>

                <h2>4. 정확한 측정을 위한 캘리브레이션 팁</h2>
                <p>온라인 자를 이용할 때 가장 오차가 적은 방법은 <strong>신용카드 보정(Credit Card Calibration)</strong>입니다. 신용카드는 국제 ISO/IEC 7810 규격을 준수하여 물리 가로 길이가 정확히 85.60mm(8.56cm)로 고정되어 있기 때문에, 디스플레이 상의 픽셀 배율을 가장 정확하게 계산해줍니다.</p>
            `,
            en: `
                <h2>1. What is PPI (Pixels Per Inch)?</h2>
                <p>PPI (Pixels Per Inch) measures pixel density within one diagonal inch (2.54 cm) of a display screen. Even with identical Full HD (1920×1080) resolution, a 24-inch monitor and a 15.6-inch laptop screen have completely different physical pixel sizes.</p>
                <p>Therefore, displaying an accurate actual-size online ruler in your browser requires knowing your display's precise PPI value.</p>

                <h2>2. Mathematical Formula for Calculating PPI</h2>
                <p>Let <em>w</em> be horizontal resolution in pixels, <em>h</em> be vertical resolution in pixels, and <em>d</em> be diagonal screen size in inches:</p>
                <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; font-family: monospace; text-align: center; margin: 1.5rem 0;">
                    PPI = √(w² + h²) / d
                </div>
                <p>For a standard 24-inch Full HD (1920 × 1080) monitor:</p>
                <ul>
                    <li>Diagonal Pixel Count = √(1920² + 1080²) = √(3,686,400 + 1,166,400) = √4,852,800 ≈ 2202.9 pixels</li>
                    <li>PPI = 2202.9 / 24 ≈ <strong>91.79 PPI</strong></li>
                </ul>

                <h2>3. Standard PPI Comparison Table Across Popular Devices</h2>
                <table style="width:100%; border-collapse: collapse; margin: 1.5rem 0; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border); color: #fff;">
                            <th style="padding: 0.8rem;">Device Type</th>
                            <th style="padding: 0.8rem;">Screen Size</th>
                            <th style="padding: 0.8rem;">Resolution</th>
                            <th style="padding: 0.8rem;">Average PPI</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">Desktop Monitor</td>
                            <td style="padding: 0.8rem;">24 Inch</td>
                            <td style="padding: 0.8rem;">1920 × 1080 (FHD)</td>
                            <td style="padding: 0.8rem;">~92 PPI</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">Desktop Monitor</td>
                            <td style="padding: 0.8rem;">27 Inch</td>
                            <td style="padding: 0.8rem;">2560 × 1440 (QHD)</td>
                            <td style="padding: 0.8rem;">~109 PPI</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">Laptop (MacBook Air)</td>
                            <td style="padding: 0.8rem;">13.6 Inch</td>
                            <td style="padding: 0.8rem;">2560 × 1664 (Retina)</td>
                            <td style="padding: 0.8rem;">~224 PPI</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">Smartphone (iPhone 15)</td>
                            <td style="padding: 0.8rem;">6.1 Inch</td>
                            <td style="padding: 0.8rem;">2556 × 1179</td>
                            <td style="padding: 0.8rem;">~460 PPI</td>
                        </tr>
                    </tbody>
                </table>

                <h2>4. Calibration Tips for Perfect Accuracy</h2>
                <p>Using <strong>Credit Card Calibration</strong> provides the highest precision when measuring with an online ruler. Because credit cards adhere strictly to international ISO/IEC 7810 standards (85.60 mm width), they serve as an ideal physical baseline for screen pixel ratio calculation.</p>
            `,
            zh: `
                <h2>1. 什么是 PPI (Pixels Per Inch)？</h2>
                <p>PPI（每英寸像素数）表示显示屏一英寸对角线空间内的像素数量。即使分辨率同为 Full HD (1920×1080)，24 英寸显示器与 15.6 英寸笔记本屏幕的物理像素尺寸也完全不同。</p>
                <p>因此，在浏览器中准确显示 1:1 实物比例的在线尺，必须掌握当前显示屏的精准 PPI 数值。</p>

                <h2>2. PPI 计算公式与数学原理</h2>
                <p>设屏幕水平像素为 <em>w</em>，垂直像素为 <em>h</em>，屏幕对角线尺寸（英寸）为 <em>d</em>：</p>
                <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; font-family: monospace; text-align: center; margin: 1.5rem 0;">
                    PPI = √(w² + h²) / d
                </div>
                <p>以 24 英寸 Full HD (1920 × 1080) 显示器为例：</p>
                <ul>
                    <li>对角线像素数 = √(1920² + 1080²) = √4,852,800 ≈ 2202.9 像素</li>
                    <li>PPI = 2202.9 / 24 ≈ <strong>91.79 PPI</strong></li>
                </ul>

                <h2>3. 常见设备 PPI 规格表</h2>
                <table style="width:100%; border-collapse: collapse; margin: 1.5rem 0; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border); color: #fff;">
                            <th style="padding: 0.8rem;">设备类型</th>
                            <th style="padding: 0.8rem;">屏幕尺寸</th>
                            <th style="padding: 0.8rem;">分辨率</th>
                            <th style="padding: 0.8rem;">平均 PPI</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">台式显示器</td>
                            <td style="padding: 0.8rem;">24 英寸</td>
                            <td style="padding: 0.8rem;">1920 × 1080 (FHD)</td>
                            <td style="padding: 0.8rem;">~92 PPI</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">台式显示器</td>
                            <td style="padding: 0.8rem;">27 英寸</td>
                            <td style="padding: 0.8rem;">2560 × 1440 (QHD)</td>
                            <td style="padding: 0.8rem;">~109 PPI</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">笔记本 (MacBook Air)</td>
                            <td style="padding: 0.8rem;">13.6 英寸</td>
                            <td style="padding: 0.8rem;">2560 × 1664 (Retina)</td>
                            <td style="padding: 0.8rem;">~224 PPI</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">智能手机 (iPhone 15)</td>
                            <td style="padding: 0.8rem;">6.1 英寸</td>
                            <td style="padding: 0.8rem;">2556 × 1179</td>
                            <td style="padding: 0.8rem;">~460 PPI</td>
                        </tr>
                    </tbody>
                </table>
            `,
            ja: `
                <h2>1. PPI (Pixels Per Inch) とは？</h2>
                <p>PPI（ピクセル・パー・インチ）は、ディスプレイの1インチ（2.54cm）内に存在するピクセル数を示す密度単位です。同じFull HD（1920×1080）解像度であっても、24インチモニターと15.6インチのノートPCでは実際のピクセルサイズが異なります。</p>
                <p>ブラウザ上で正確な実物大の定規を表示するには、お使いのディスプレイの正確なPPI値が必要です。</p>

                <h2>2. PPIの計算公式と数学的原理</h2>
                <p>画面の横ピクセル数を <em>w</em>、縦ピクセル数を <em>h</em>、画面対角サイズ（インチ）を <em>d</em> とした場合の計算式：</p>
                <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; font-family: monospace; text-align: center; margin: 1.5rem 0;">
                    PPI = √(w² + h²) / d
                </div>
                <p>24インチ Full HD (1920 × 1080) モニターの例：</p>
                <ul>
                    <li>対角ピクセル数 = √(1920² + 1080²) ≈ 2202.9 ピクセル</li>
                    <li>PPI = 2202.9 / 24 ≈ <strong>91.79 PPI</strong></li>
                </ul>
            `
        }
    },
    {
        slug: "paper-sizes",
        date: "2026-08-14",
        readTime: "4 min read",
        category: {
            ko: "규격 표준",
            en: "Standard Specifications",
            zh: "标准规格",
            ja: "標準規格",
            es: "Especificaciones Estándar",
            hi: "मानक विनिर्देशों",
            fr: "Spécifications Standards",
            ar: "المواصفات القياسية",
            ru: "Стандартные Спецификации"
        },
        title: {
            ko: "A4, A3, B5, 레터 종이 규격 및 실제 크기(cm, inch) 수치표",
            en: "Standard Paper Sizes Guide: A4, A3, B5, Letter in cm & Inches",
            zh: "标准纸张尺寸指南：A4、A3、B5、Letter 详细数值表（cm、inch）",
            ja: "標準用紙サイズガイド：A4・A3・B5・レターの実寸（cm・inch）一覧表",
            es: "Guía de Tamaños de Papel Estándar: A4, A3, B5, Carta en cm y Pulgadas",
            hi: "मानक कागज़ का आकार गाइड: A4, A3, B5, Letter सेमी और इंच में",
            fr: "Guide des Formats de Papier Standard: A4, A3, B5, Letter en cm et Pouces",
            ar: "دليل مقاسات الورق القياسية: A4، A3، B5، Letter بالسنتيمتر والبوصة",
            ru: "Справочник стандартных форматов бумаги: A4, A3, B5, Letter в см и дюймах"
        },
        summary: {
            ko: "국제 ISO 216 종이 표준 규격인 A시리즈, B시리즈 및 북미 ANSI 레터 크기의 센티미터, 밀리미터, 인치 단위 수치표를 확인할 수 있습니다.",
            en: "Comprehensive dimensions table for international ISO 216 paper series (A/B series) and North American ANSI Letter formats in cm, mm, and inches.",
            zh: "涵盖国际 ISO 216 纸张标准（A/B系列）及北美 ANSI Letter 规格的厘米、毫米及英寸尺寸表。",
            ja: "国際標準ISO 216規格（A/Bシリーズ）および北米ANSIレター規格のセンチ、ミリ、インチ単位の寸法表を確認できます。",
            es: "Tabla de dimensiones completa para la serie de papel internacional ISO 216 y los formatos norteamericanos ANSI Letter.",
            hi: "अंतर्राष्ट्रीय ISO 216 कागज़ श्रृंखला और उत्तरी अमेरिकी ANSI Letter प्रारूपों के लिए सेमी, मिमी और इंच में आकार तालिका।",
            fr: "Tableau complet des dimensions pour la série internationale ISO 216 et les formats nord-américains ANSI Letter.",
            ar: "جدول أبعاد شامل لسلسلة الورق الدولية ISO 216 ونماذج ANSI Letter الأمريكية.",
            ru: "Полная таблица размеров международной серии ISO 216 и североамериканских форматов ANSI Letter."
        },
        content: {
            ko: `
                <h2>1. 국제 종이 표준 ISO 216 개요</h2>
                <p>전 세계에서 가장 널리 사용되는 종이 규격은 ISO 216 국제 표준입니다. 독일 물리학자 게오르크 크리스토프 리히텐베르크가 고안한 1:√2 (약 1:1.4142)의 비율을 기초로 하며, 반으로 접어도 가로 세로 비율이 유지되는 고유한 특성을 갖습니다.</p>

                <h2>2. ISO A 시리즈 종이 크기 수치표</h2>
                <table style="width:100%; border-collapse: collapse; margin: 1.5rem 0; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border); color: #fff;">
                            <th style="padding: 0.8rem;">규격 명칭</th>
                            <th style="padding: 0.8rem;">밀리미터 (mm)</th>
                            <th style="padding: 0.8rem;">센티미터 (cm)</th>
                            <th style="padding: 0.8rem;">인치 (inch)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;"><strong>A0</strong></td>
                            <td style="padding: 0.8rem;">841 × 1189 mm</td>
                            <td style="padding: 0.8rem;">84.1 × 118.9 cm</td>
                            <td style="padding: 0.8rem;">33.1 × 46.8 in</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border); background: rgba(99,102,241,0.1);">
                            <td style="padding: 0.8rem;"><strong>A4 (가장 보편적)</strong></td>
                            <td style="padding: 0.8rem;">210 × 297 mm</td>
                            <td style="padding: 0.8rem;">21.0 × 29.7 cm</td>
                            <td style="padding: 0.8rem;">8.3 × 11.7 in</td>
                        </tr>
                    </tbody>
                </table>
            `,
            en: `
                <h2>1. Overview of ISO 216 International Paper Standards</h2>
                <p>The ISO 216 standard governs paper sizes used across most countries globally. Designed based on the 1:√2 (approx 1:1.4142) aspect ratio, folding the paper in half maintains the exact same aspect ratio.</p>

                <h2>2. ISO A-Series Dimensions Reference Table</h2>
                <table style="width:100%; border-collapse: collapse; margin: 1.5rem 0; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border); color: #fff;">
                            <th style="padding: 0.8rem;">Format</th>
                            <th style="padding: 0.8rem;">Millimeters (mm)</th>
                            <th style="padding: 0.8rem;">Centimeters (cm)</th>
                            <th style="padding: 0.8rem;">Inches (in)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid var(--border); background: rgba(99,102,241,0.1);">
                            <td style="padding: 0.8rem;"><strong>A4 (Standard)</strong></td>
                            <td style="padding: 0.8rem;">210 × 297 mm</td>
                            <td style="padding: 0.8rem;">21.0 × 29.7 cm</td>
                            <td style="padding: 0.8rem;">8.3 × 11.7 in</td>
                        </tr>
                    </tbody>
                </table>
            `
        }
    },
    {
        slug: "reference-objects",
        date: "2026-08-14",
        readTime: "4 min read",
        category: {
            ko: "실물 측정 도구",
            en: "Reference Objects",
            zh: "参考物体",
            ja: "参照物",
            es: "Objetos de Referencia",
            hi: "संदर्भ वस्तुएं",
            fr: "Objets de Référence",
            ar: "أجسام مرجعية",
            ru: "Эталонные Предметы"
        },
        title: {
            ko: "신용카드, 신분증, 동전의 실제 물리적 크기 규격표",
            en: "Physical Dimensions Reference Table: Credit Cards, Coins & Badges",
            zh: "参照物尺寸表：信用卡、身份证、硬币的物理尺寸规格",
            ja: "参照物の実寸サイズ表：クレジットカード・身分証・硬貨の物理寸法",
            es: "Tabla de Referencia de Dimensiones Físicas: Tarjetas de Crédito, Monedas e Identificaciones",
            hi: "भौतिक आयाम संदर्भ तालिका: क्रेडिट कार्ड, सिक्के और पहचान पत्र",
            fr: "Tableau de Référence des Dimensions Physiques: Cartes de Crédit, Pièces de Monnaie et Cartes d'Identité",
            ar: "جدول الأبعاد المرجعية: بطاقات الائتمان والعملات والبطاقات الشخصية",
            ru: "Таблица физических размеров: кредитные карты, монеты и удостоверения"
        },
        summary: {
            ko: "실물 자가 없을 때 주변에서 흔히 구할 수 있는 신용카드, 운전면허증, 동전의 물리적 직경과 두께 수치 목록입니다.",
            en: "Physical reference table for credit cards, driver's licenses, and coins to calibrate digital measurement tools when a physical ruler is unavailable.",
            zh: "当手中没有实物尺时，可用于校准屏幕尺的信用卡、驾照及常见硬币的物理直径与厚度参考表。",
            ja: "定規がないときに便利なクレジットカード、運転免許証、主要硬貨の直径および厚さの寸法一覧表です。",
            es: "Tabla de referencia física para tarjetas de crédito, licencias de conducir y monedas para calibrar reglas digitales.",
            hi: "डिजिटल रूलर को कैलिब्रेट करने के लिए क्रेडिट कार्ड, ड्राइविंग लाइसेंस और सिक्कों के आयामों की संदर्भ तालिका।",
            fr: "Tableau de référence physique pour cartes de crédit, permis de conduire et pièces de monnaie afin d'étalonner les règles numériques.",
            ar: "جدول مرجعي لبطاقات الائتمان ورخص القيادة والعملات لضبط أداة القياس عند عدم توفر مسطرة.",
            ru: "Справочная таблица физических размеров кредитных карт, водительских прав и монет для калибровки линейки."
        },
        content: {
            ko: `
                <h2>1. ISO/IEC 7810 신용카드 규격</h2>
                <p>전 세계 신용카드, 체크카드, 운전면허증 및 주민등록증은 <strong>ISO/IEC 7810 ID-1</strong> 국제 표준에 따라 정밀하게 제작됩니다.</p>
                <ul>
                    <li><strong>가로 길이:</strong> 85.60 mm (8.56 cm / 3.370 in)</li>
                    <li><strong>세로 높이:</strong> 53.98 mm (5.40 cm / 2.125 in)</li>
                </ul>
            `,
            en: `
                <h2>1. ISO/IEC 7810 Credit Card Standard Dimensions</h2>
                <p>Credit cards, debit cards, driver's licenses, and ID cards globally adhere strictly to the <strong>ISO/IEC 7810 ID-1</strong> specification.</p>
                <ul>
                    <li><strong>Width:</strong> 85.60 mm (8.56 cm / 3.370 in)</li>
                    <li><strong>Height:</strong> 53.98 mm (5.40 cm / 2.125 in)</li>
                </ul>
            `
        }
    },
    {
        slug: "how-to-calibrate",
        date: "2026-08-14",
        readTime: "3 min read",
        category: {
            ko: "사용 가이드",
            en: "Usage Guide",
            zh: "使用指南",
            ja: "使用ガイド",
            es: "Guía de Uso",
            hi: "उपयोग गाइड",
            fr: "Guide d'Utilisation",
            ar: "دليل الاستخدام",
            ru: "Руководство"
        },
        title: {
            ko: "온라인 자(Online Ruler) 정밀 보정 및 측정 단계별 지침",
            en: "Step-by-Step Guide to Calibrating and Using an Online Screen Ruler",
            zh: "屏幕尺精确校准与测量分步指南",
            ja: "オンライン画面定規の精密キャリブレーション＆測定ステップバイステップガイド",
            es: "Guía Paso a Paso para Calibrar y Usar una Regla en Pantalla",
            hi: "ऑनलाइन स्क्रीन रूलर को कैलिब्रेट और उपयोग करने के लिए स्टेप-बाय-स्टेप गाइड",
            fr: "Guide Étape par Étape pour Étalonner et Utiliser une Règle sur Écran",
            ar: "دليل خطوة بخطوة لضبط واستخدام مسطرة الشاشة عبر الإنترنت",
            ru: "Пошаговое руководство по калибровке и использованию экранной линейки"
        },
        summary: {
            ko: "브라우저 화면에서 오차 없이 정확하게 센티미터와 인치를 측정하기 위한 보정 절차와 멀티 마커 활용 팁입니다.",
            en: "Step-by-step instructions for zero-error calibration and using multi-marker measurements directly in your web browser.",
            zh: "了解在 Web 浏览器中实现零误差校准以及使用多重标记线同时测量多个物体的方法。",
            ja: "ブラウザ画面で誤差なくセンチメートルとインチを測定するための校正手順とマルチマーカーの活用法を紹介します。",
            es: "Instrucciones paso a paso para calibración sin errores y mediciones con múltiples marcadores directamente en su navegador web.",
            hi: "वेब ब्राउज़र में शून्य-त्रुटि कैलिब्रेशन और मल्टी-मार्कर मापन का उपयोग करने के लिए निर्देश।",
            fr: "Instructions étape par étape pour un étalonnage sans erreur et des mesures multi-repères sur votre navigateur.",
            ar: "إرشادات خطوة بخطوة للعايرة بدون أخطاء واستخدام علامات قياس متعددة على متصفحك.",
            ru: "Пошаговые инструкции по калибровке без ошибок и использованию нескольких маркеров для измерений в браузере."
        },
        content: {
            ko: `
                <h2>1. 캘리브레이션 3단계 안내</h2>
                <ol style="line-height: 2;">
                    <li><strong>브라우저 줌 100% 확인:</strong> 단축키 <code>Ctrl + 0</code> (Mac은 <code>Cmd + 0</code>)을 눌러 화면 확대 비율을 기본값으로 초기화합니다.</li>
                    <li><strong>보정 도구 선택:</strong> 상단 [보정] 버튼을 클릭하고 [신용카드] 또는 [모니터 크기] 탭 중 편한 방식을 선택합니다.</li>
                    <li><strong>기준 크기 맞추기:</strong> 신용카드 선택 시 화면 상의 박스 크기를 카드 실물 가로(8.56cm)에 똑같이 맞춰 조정한 후 [저장]을 누릅니다.</li>
                </ol>
            `,
            en: `
                <h2>1. 3-Step Calibration Procedure</h2>
                <ol style="line-height: 2;">
                    <li><strong>Verify Browser Zoom:</strong> Press <code>Ctrl + 0</code> (or <code>Cmd + 0</code> on Mac) to reset display zoom to 100%.</li>
                    <li><strong>Select Calibration Mode:</strong> Click [Calibrate] in top bar and select either [Credit Card] or [Monitor Size].</li>
                    <li><strong>Align Physical Reference:</strong> Hold a physical credit card against screen, adjust container width to match 85.60 mm width, and save.</li>
                </ol>
            `
        }
    }
];
