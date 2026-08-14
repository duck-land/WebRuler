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
            en: "Complete Guide to Screen PPI & Pixel Density Calculation"
        },
        summary: {
            ko: "모니터, 노트북, 스마트폰 화면에서 물리적 센티미터와 픽셀 수치의 관계, PPI 계산 공식 및 기기별 밀도표를 알아봅니다.",
            en: "Learn the relationship between physical centimeters and pixel counts across monitors, laptops, and smartphones with PPI formulas and device tables."
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
            en: "Standard Paper Sizes Guide: A4, A3, B5, Letter in cm & Inches"
        },
        summary: {
            ko: "국제 ISO 216 종이 표준 규격인 A시리즈, B시리즈 및 북미 ANSI 레터 크기의 센티미터, 밀리미터, 인치 단위 수치표를 확인할 수 있습니다.",
            en: "Comprehensive dimensions table for international ISO 216 paper series (A/B series) and North American ANSI Letter formats in cm, mm, and inches."
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
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;"><strong>A1</strong></td>
                            <td style="padding: 0.8rem;">594 × 841 mm</td>
                            <td style="padding: 0.8rem;">59.4 × 84.1 cm</td>
                            <td style="padding: 0.8rem;">23.4 × 33.1 in</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;"><strong>A2</strong></td>
                            <td style="padding: 0.8rem;">420 × 594 mm</td>
                            <td style="padding: 0.8rem;">42.0 × 59.4 cm</td>
                            <td style="padding: 0.8rem;">16.5 × 23.4 in</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;"><strong>A3</strong></td>
                            <td style="padding: 0.8rem;">297 × 420 mm</td>
                            <td style="padding: 0.8rem;">29.7 × 42.0 cm</td>
                            <td style="padding: 0.8rem;">11.7 × 16.5 in</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border); background: rgba(99,102,241,0.1);">
                            <td style="padding: 0.8rem;"><strong>A4 (가장 보편적)</strong></td>
                            <td style="padding: 0.8rem;">210 × 297 mm</td>
                            <td style="padding: 0.8rem;">21.0 × 29.7 cm</td>
                            <td style="padding: 0.8rem;">8.3 × 11.7 in</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;"><strong>A5</strong></td>
                            <td style="padding: 0.8rem;">148 × 210 mm</td>
                            <td style="padding: 0.8rem;">14.8 × 21.0 cm</td>
                            <td style="padding: 0.8rem;">5.8 × 8.3 in</td>
                        </tr>
                    </tbody>
                </table>

                <h2>3. 북미 종이 표준 (ANSI / US Letter)</h2>
                <p>미국, 캐나다, 멕시코 등 북미 지역에서는 ISO 표준 대신 ANSI 표준(US Letter, Legal 등)을 보편적으로 사용합니다.</p>
                <ul>
                    <li><strong>US Letter:</strong> 8.5 × 11.0 인치 (215.9 × 279.4 mm / 21.59 × 27.94 cm)</li>
                    <li><strong>US Legal:</strong> 8.5 × 14.0 인치 (215.9 × 355.6 mm / 21.59 × 35.56 cm)</li>
                </ul>

                <h2>4. 화면 계측시 유용한 팁</h2>
                <p>A4 용지(21.0cm × 29.7cm)는 신용카드 다음으로 디스플레이 캘리브레이션 시 유용한 참조 물체입니다. 화면에 A4 용지를 직접 대어 자의 눈금을 보정할 수 있습니다.</p>
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
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;"><strong>A0</strong></td>
                            <td style="padding: 0.8rem;">841 × 1189 mm</td>
                            <td style="padding: 0.8rem;">84.1 × 118.9 cm</td>
                            <td style="padding: 0.8rem;">33.1 × 46.8 in</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;"><strong>A1</strong></td>
                            <td style="padding: 0.8rem;">594 × 841 mm</td>
                            <td style="padding: 0.8rem;">59.4 × 84.1 cm</td>
                            <td style="padding: 0.8rem;">23.4 × 33.1 in</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;"><strong>A2</strong></td>
                            <td style="padding: 0.8rem;">420 × 594 mm</td>
                            <td style="padding: 0.8rem;">42.0 × 59.4 cm</td>
                            <td style="padding: 0.8rem;">16.5 × 23.4 in</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;"><strong>A3</strong></td>
                            <td style="padding: 0.8rem;">297 × 420 mm</td>
                            <td style="padding: 0.8rem;">29.7 × 42.0 cm</td>
                            <td style="padding: 0.8rem;">11.7 × 16.5 in</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border); background: rgba(99,102,241,0.1);">
                            <td style="padding: 0.8rem;"><strong>A4 (Standard)</strong></td>
                            <td style="padding: 0.8rem;">210 × 297 mm</td>
                            <td style="padding: 0.8rem;">21.0 × 29.7 cm</td>
                            <td style="padding: 0.8rem;">8.3 × 11.7 in</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;"><strong>A5</strong></td>
                            <td style="padding: 0.8rem;">148 × 210 mm</td>
                            <td style="padding: 0.8rem;">14.8 × 21.0 cm</td>
                            <td style="padding: 0.8rem;">5.8 × 8.3 in</td>
                        </tr>
                    </tbody>
                </table>

                <h2>3. North American Standards (ANSI / US Letter)</h2>
                <p>In the US, Canada, and Mexico, ANSI paper formats are standard instead of ISO sizes:</p>
                <ul>
                    <li><strong>US Letter:</strong> 8.5 × 11.0 in (215.9 × 279.4 mm / 21.59 × 27.94 cm)</li>
                    <li><strong>US Legal:</strong> 8.5 × 14.0 in (215.9 × 355.6 mm / 21.59 × 35.56 cm)</li>
                </ul>

                <h2>4. Screen Calibration Tip</h2>
                <p>Standard A4 paper (21.0 cm × 29.7 cm) works excellent as a physical calibration reference alongside credit cards when using online rulers.</p>
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
            en: "Physical Dimensions Reference Table: Credit Cards, Coins & Badges"
        },
        summary: {
            ko: "실물 자가 없을 때 주변에서 흔히 구할 수 있는 신용카드, 운전면허증, 동전의 물리적 직경과 두께 수치 목록입니다.",
            en: "Physical reference table for credit cards, driver's licenses, and coins to calibrate digital measurement tools when a physical ruler is unavailable."
        },
        content: {
            ko: `
                <h2>1. ISO/IEC 7810 신용카드 규격</h2>
                <p>전 세계 신용카드, 체크카드, 운전면허증 및 주민등록증은 **ISO/IEC 7810 ID-1** 국제 표준에 따라 정밀하게 제작됩니다.</p>
                <ul>
                    <li><strong>가로 길이:</strong> 85.60 mm (8.56 cm / 3.370 in)</li>
                    <li><strong>세로 높이:</strong> 53.98 mm (5.40 cm / 2.125 in)</li>
                    <li><strong>모서리 라운딩 반지름:</strong> 3.18 mm</li>
                </ul>

                <h2>2. 주요 동전 물리적 직경표</h2>
                <table style="width:100%; border-collapse: collapse; margin: 1.5rem 0; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border); color: #fff;">
                            <th style="padding: 0.8rem;">동전 종류</th>
                            <th style="padding: 0.8rem;">직경 (mm)</th>
                            <th style="padding: 0.8rem;">직경 (cm)</th>
                            <th style="padding: 0.8rem;">두께 (mm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">대한민국 500원</td>
                            <td style="padding: 0.8rem;">26.50 mm</td>
                            <td style="padding: 0.8rem;">2.65 cm</td>
                            <td style="padding: 0.8rem;">2.00 mm</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">대한민국 100원</td>
                            <td style="padding: 0.8rem;">24.00 mm</td>
                            <td style="padding: 0.8rem;">2.40 cm</td>
                            <td style="padding: 0.8rem;">1.90 mm</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">미국 25센트 (Quarter)</td>
                            <td style="padding: 0.8rem;">24.26 mm</td>
                            <td style="padding: 0.8rem;">2.43 cm</td>
                            <td style="padding: 0.8rem;">1.75 mm</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">유로 2 유로 (2 Euro)</td>
                            <td style="padding: 0.8rem;">25.75 mm</td>
                            <td style="padding: 0.8rem;">2.58 cm</td>
                            <td style="padding: 0.8rem;">2.20 mm</td>
                        </tr>
                    </tbody>
                </table>

                <h2>3. 정밀 보정 팁</h2>
                <p>화면에 카드를 대고 보정할 때는 모니터 줌 수치가 100%인지 반드시 먼저 확인하세요. 줌이 110%나 90%로 되어 있다면 캘리브레이션 오차가 발생할 수 있습니다.</p>
            `,
            en: `
                <h2>1. ISO/IEC 7810 Credit Card Standard Dimensions</h2>
                <p>Credit cards, debit cards, driver's licenses, and ID cards globally adhere strictly to the **ISO/IEC 7810 ID-1** specification.</p>
                <ul>
                    <li><strong>Width:</strong> 85.60 mm (8.56 cm / 3.370 in)</li>
                    <li><strong>Height:</strong> 53.98 mm (5.40 cm / 2.125 in)</li>
                    <li><strong>Corner Radius:</strong> 3.18 mm</li>
                </ul>

                <h2>2. Coin Physical Diameters Table</h2>
                <table style="width:100%; border-collapse: collapse; margin: 1.5rem 0; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border); color: #fff;">
                            <th style="padding: 0.8rem;">Coin</th>
                            <th style="padding: 0.8rem;">Diameter (mm)</th>
                            <th style="padding: 0.8rem;">Diameter (cm)</th>
                            <th style="padding: 0.8rem;">Thickness (mm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">US Quarter (25¢)</td>
                            <td style="padding: 0.8rem;">24.26 mm</td>
                            <td style="padding: 0.8rem;">2.43 cm</td>
                            <td style="padding: 0.8rem;">1.75 mm</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">Euro 2 (€2)</td>
                            <td style="padding: 0.8rem;">25.75 mm</td>
                            <td style="padding: 0.8rem;">2.58 cm</td>
                            <td style="padding: 0.8rem;">2.20 mm</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">UK 1 Pound (£1)</td>
                            <td style="padding: 0.8rem;">23.43 mm</td>
                            <td style="padding: 0.8rem;">2.34 cm</td>
                            <td style="padding: 0.8rem;">2.80 mm</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.8rem;">KRW 500 Coin</td>
                            <td style="padding: 0.8rem;">26.50 mm</td>
                            <td style="padding: 0.8rem;">2.65 cm</td>
                            <td style="padding: 0.8rem;">2.00 mm</td>
                        </tr>
                    </tbody>
                </table>

                <h2>3. Precision Calibration Tip</h2>
                <p>Ensure your browser zoom level is set to 100% (Ctrl+0 / Cmd+0) prior to aligning reference objects against your screen.</p>
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
            en: "Step-by-Step Guide to Calibrating and Using an Online Screen Ruler"
        },
        summary: {
            ko: "브라우저 화면에서 오차 없이 정확하게 센티미터와 인치를 측정하기 위한 보정 절차와 멀티 마커 활용 팁입니다.",
            en: "Step-by-step instructions for zero-error calibration and using multi-marker measurements directly in your web browser."
        },
        content: {
            ko: `
                <h2>1. 캘리브레이션 3단계 안내</h2>
                <ol style="line-height: 2;">
                    <li><strong>브라우저 줌 100% 확인:</strong> 단축키 <code>Ctrl + 0</code> (Mac은 <code>Cmd + 0</code>)을 눌러 화면 확대 비율을 기본값으로 초기화합니다.</li>
                    <li><strong>보정 도구 선택:</strong> 상단 [보정] 버튼을 클릭하고 [신용카드] 또는 [모니터 크기] 탭 중 편한 방식을 선택합니다.</li>
                    <li><strong>기준 크기 맞추기:</strong> 신용카드 선택 시 화면 상의 박스 크기를 카드 실물 가로(8.56cm)에 똑같이 맞춰 조정한 후 [저장]을 누릅니다.</li>
                </ol>

                <h2>2. 멀티 마커(Multi-Marker)로 여러 길이 동시에 재기</h2>
                <p>RulerHero는 2개 이상의물체를 동시에 재거나 선 간격을 측정할 수 있는 멀티 마커 기능을 지원합니다.</p>
                <ul>
                    <li>화면의 빈 영역이나 자 눈금을 클릭/터치하면 새로운 마커 선이 생성됩니다.</li>
                    <li>마커 라벨을 드래그하여 물체의 양끝에 맞추면 실시간으로 센티미터(cm) 및 인치(in) 수치가 계산됩니다.</li>
                    <li>불필요해진 마커는 라벨 옆의 ✕ 버튼이나 [기록] 탭 리스트에서 즉시 삭제할 수 있습니다.</li>
                </ul>

                <h2>3. 모바일 스마트폰 환경 활용</h2>
                <p>스마트폰의 터치스크린 위에서도 동전이나 카드, 열쇠 등의 물리적 소품을 직접 올려둔 뒤 손가락 터치 드래그로 손쉽게 측정하실 수 있습니다.</p>
            `,
            en: `
                <h2>1. 3-Step Calibration Procedure</h2>
                <ol style="line-height: 2;">
                    <li><strong>Verify Browser Zoom:</strong> Press <code>Ctrl + 0</code> (or <code>Cmd + 0</code> on Mac) to reset display zoom to 100%.</li>
                    <li><strong>Select Calibration Mode:</strong> Click [Calibrate] in top bar and select either [Credit Card] or [Monitor Size].</li>
                    <li><strong>Align Physical Reference:</strong> Hold a physical credit card against screen, adjust container width to match 85.60 mm width, and save.</li>
                </ol>

                <h2>2. Measuring Multiple Items with Multi-Markers</h2>
                <p>RulerHero supports creating multiple draggable measurement markers simultaneously:</p>
                <ul>
                    <li>Click or tap anywhere on ruler area to spawn new color-coded marker lines.</li>
                    <li>Drag markers to align with your target object's endpoints for real-time length readouts.</li>
                    <li>Remove unwanted markers anytime using the ✕ icon next to the marker label or in the Record tab.</li>
                </ul>

                <h2>3. Smartphone Usage</h2>
                <p>Place physical objects directly on your mobile screen and drag markers using touch controls for fast mobile measurements.</p>
            `
        }
    }
];
