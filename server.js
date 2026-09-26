/**
 * ============================================================================
 * مشروع نظام المحاسبة الذكي الآلي (AI-ACC - Trainware as a Service / TaaS)
 * الملف الرئيسي: server.js
 * المطور: د. صفاء رزق إبراهيم قنديل
 * الوصف: محاكاة كاملة للدورة المحاسبية الإلكترونية عبر 3 أشهر (يوليو - سبتمبر 2026)
 * ============================================================================
 */

import 'dotenv/config';
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
// مسار الصفحة الرئيسية لعرض واجهة منصة Wise الرقمية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// تهيئة اتصال قاعدة بيانات Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * ----------------------------------------------------------------------------
 * دالة توليد واجهة العرض التفاعلية (HTML Frontend Generator)
 * ----------------------------------------------------------------------------
 */
function renderAccountingDemoHTML() {
    return `
    <html dir="rtl" lang="ar" id="htmlRoot">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title data-ar="نظام المحاسبة الآلي المتكامل - AI-ACC" data-en="Integrated Automated Accounting System - AI-ACC">نظام المحاسبة الآلي المتكامل - AI-ACC</title>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <style>
                :root { --primary: #0284c7; --bg: #f8fafc; --text: #1e293b; --card-bg: #ffffff; }
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: var(--bg); color: var(--text); margin: 0; padding: 15px; }
                .container { max-width: 1400px; margin: auto; background: var(--card-bg); padding: 25px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
                
                /* شريط التحكم العلوي واللغات */
                .top-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; flex-wrap: wrap; gap: 10px; }
                .lang-btn { background: #0f172a; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; }
                
                /* التبويبات والأزرار الملونة */
                .tab-bar { display: flex; gap: 8px; margin: 20px 0; flex-wrap: wrap; }
                .tab-btn { border: none; padding: 10px 16px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 13px; color: white; transition: 0.2s; }
                .btn-all { background: #3b82f6; }
                .btn-journal { background: #6366f1; }
                .btn-ledger { background: #8b5cf6; }
                .btn-tb { background: #ec4899; }
                .btn-reports { background: #14b8a6; }
                .btn-indicators { background: #d97706; }
                .tab-btn:hover { opacity: 0.85; }

                .section-panel { display: none; margin-top: 25px; }
                .section-panel.active { display: block; }

                /* الجداول المحاسبية */
                .table-responsive { width: 100%; overflow-x: auto; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 20px; font-size: 13px; min-width: 600px; }
                th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: center; }
                th { background-color: #f1f5f9; color: #334155; }

                /* الفلاتر الشهرية */
                .filter-bar { background: #eff6ff; padding: 15px; border-radius: 8px; display: flex; gap: 15px; align-items: center; margin-bottom: 15px; flex-wrap: wrap; }
                
                /* صندوق الإدخال والتنسيق */
                .form-container { background: #f8fafc; padding: 20px; border-radius: 12px; margin-top: 20px; border: 1px dashed #cbd5e1; }
                .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px; }
                .form-group label { display: block; margin-bottom: 5px; font-weight: bold; font-size: 13px; }
                .form-group select, .form-group input { width: 100%; padding: 9px; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box; }
                
                .btn-action { background: #0284c7; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: bold; margin-top: 10px; }
                .btn-danger { background: #e2e8f0; color: #94a3b8; border: none; padding: 8px 15px; border-radius: 6px; cursor: not-allowed; font-size: 12px; }

                /* المؤشرات المالية وتصميم البطاقات */
                .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
                .card-box { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; }
                .indicator-card { background: white; border-right: 4px solid #0284c7; padding: 15px; margin-bottom: 12px; border-radius: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.02); }
                .indicator-title { font-weight: bold; color: #0f172a; font-size: 14px; }
                .indicator-desc { font-size: 12px; color: #64748b; margin-top: 5px; line-height: 1.5; }

                @media (max-width: 768px) {
                    .container { padding: 10px; }
                    .top-bar { flex-direction: column; align-items: flex-start; }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- الشريط العلوي مع زر تبديل اللغة -->
                <div class="top-bar">
                    <div>
                        <h1 id="sysTitle" style="margin:0; font-size: 22px; color:#0f172a;">نظام المحاسبة الآلي المتكامل (AI-ACC)</h1>
                        <span style="background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; display:inline-block; margin-top:5px;" id="badgeText">محاكاة الدورة المحاسبية المتكاملة (يوليو - سبتمبر 2026)</span>
                    </div>
                    <button class="lang-btn" onclick="toggleLanguage()">English / العربية</button>
                </div>

                <!-- أزرار التبويبات الملونة للعرض الفردي أو الكلي -->
                <div class="tab-bar">
                    <button class="tab-btn btn-all" onclick="showSection('all')" data-ar="عرض الكل" data-en="View All">عرض الكل</button>
                    <button class="tab-btn btn-journal" onclick="showSection('journal')" data-ar="1. دفتر اليومية" data-en="1. General Journal">1. دفتر اليومية</button>
                    <button class="tab-btn btn-ledger" onclick="showSection('ledger')" data-ar="2. كشوف الأستاذ" data-en="2. General Ledger">2. كشوف الأستاذ</button>
                    <button class="tab-btn btn-tb" onclick="showSection('tb')" data-ar="3. ميزان المراجعة" data-en="3. Trial Balance">3. ميزان المراجعة</button>
                    <button class="tab-btn btn-reports" onclick="showSection('reports')" data-ar="4. القوائم المالية (3 أشهر)" data-en="4. Financial Statements">4. القوائم المالية (3 أشهر)</button>
                    <button class="tab-btn btn-indicators" onclick="showSection('indicators')" data-ar="5. المؤشرات والتحليلات" data-en="5. Financial Indicators">5. المؤشرات والتحليلات</button>
                </div>

                <!-- شريط فلترة الشهر المالي -->
                <div class="filter-bar">
                    <label style="font-weight: bold; font-size: 13px;" data-ar="اختر نطاق العرض المالي:" data-en="Select Financial Period Filter:">اختر نطاق العرض المالي:</label>
                    <select id="periodFilter" onchange="filterDataByPeriod()" style="padding: 8px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 13px;">
                        <option value="all" data-ar="كل الربع سنة (يوليو - سبتمبر 2026)" data-en="Full Quarter (July - Sep 2026)">كل الربع سنة (يوليو - سبتمبر 2026)</option>
                        <option value="july" data-ar="شهر يوليو 2026 (بداية السنة المالية)" data-en="July 2026 (Fiscal Year Start)">شهر يوليو 2026 (بداية السنة المالية)</option>
                        <option value="august" data-ar="شهر أغسطس 2026" data-en="August 2026">شهر أغسطس 2026</option>
                        <option value="september" data-ar="شهر سبتمبر 2026" data-en="September 2026">شهر سبتمبر 2026</option>
                    </select>
                </div>

                <!-- قسم توليد معاملة مالية للتجارة الإلكترونية -->
                <div class="form-container">
                    <h3 style="margin-top:0; color:#0f172a;" data-ar="إدخال معاملة مالية جديدة وتحديث النتائج لحظياً" data-en="Enter New Financial Transaction & Update Instantly">إدخال معاملة مالية جديدة وتحديث النتائج لحظياً</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label data-ar="نوع معاملة التجارة الإلكترونية:" data-en="E-Commerce Transaction Type:">نوع معاملة التجارة الإلكترونية:</label>
                            <select id="ecommerceType" onchange="updateDefaultAmount()">
                                <option value="مبيعات متجر إلكتروني فورية (بوابة دفع)">مبيعات متجر إلكتروني فورية (بوابة دفع)</option>
                                <option value="مرتجعات مبيعات العملاء">مرتجعات مبيعات العملاء</option>
                                <option value="مصاريف شحن وتوصيل الطلبات">مصاريف شحن وتوصيل الطلبات</option>
                                <option value="مصاريف تسويق رقمي وإعلانات ممولة">مصاريف تسويق رقمي وإعلانات ممولة</option>
                                <option value="تحصيل مستحقات عملاء آجل (تقسيط / محفظة)">تحصيل مستحقات عملاء آجل (تقسيط / محفظة)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label data-ar="المبلغ (ريال):" data-en="Amount (SAR):">المبلغ (ريال):</label>
                            <input type="number" id="txAmount" value="5000">
                        </div>
                        <div class="form-group">
                            <label data-ar="الشهر المالي المستهدف:" data-en="Target Financial Month:">الشهر المالي المستهدف:</label>
                            <select id="txMonth">
                                <option value="يوليو 2026">يوليو 2026</option>
                                <option value="أغسطس 2026">أغسطس 2026</option>
                                <option value="سبتمبر 2026" selected>سبتمبر 2026</option>
                            </select>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; flex-wrap: wrap; gap: 10px;">
                        <button class="btn-action" onclick="addNewTransaction()" data-ar="توليد معاملة مالية ومشاهدة تحديث النتائج فوراً" data-en="Generate Financial Transaction & View Results Instantly">توليد معاملة مالية ومشاهدة تحديث النتائج فوراً</button>
                        <div>
                            <input type="text" id="activationCode" placeholder="كود تفعيل الشركة..." style="padding: 7px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 12px; width: 130px;" disabled>
                            <button class="btn-danger" title="مخصص للارتباط بقاعدة بيانات الشركة الفعلية عند إطلاق الاشتراك">حذف البيانات الوهمية (مقفل)</button>
                        </div>
                    </div>
                </div>

                <!-- 1. دفتر اليومية العامة -->
                <div id="sec-journal" class="section-panel active">
                    <h2 data-ar="1. دفتر اليومية العامة (قيود المحاكاة الممتدة)" data-en="1. General Journal (Extended Simulation Entries)">1. دفتر اليومية العامة (قيود المحاكاة الممتدة)</h2>
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th data-ar="رقم القند / الأوردر" data-en="Entry / Order ID">رقم القيد / الأوردر</th>
                                    <th data-ar="بيان المعاملة" data-en="Transaction Description">بيان المعاملة</th>
                                    <th data-ar="التاريخ" data-en="Date">التاريخ</th>
                                    <th data-ar="الشهر المالي" data-en="Financial Month">الشهر المالي</th>
                                    <th data-ar="كود الحساب" data-en="Account Code">كود الحساب</th>
                                    <th data-ar="مدين" data-en="Debit">مدين</th>
                                    <th data-ar="دائن" data-en="Credit">دائن</th>
                                    <th data-ar="توافق معايير (IFRS)" data-en="IFRS Compliance">توافق معايير (IFRS)</th>
                                </tr>
                            </thead>
                            <tbody id="journalBody">
                                <tr data-month="july">
                                    <td>J-001</td>
                                    <td>إثبات رأس المال النقدي الافتتاحي</td>
                                    <td>2026-07-01</td>
                                    <td>يوليو 2026</td>
                                    <td>101100 (النقدية)</td>
                                    <td>150,000</td>
                                    <td>0</td>
                                    <td>رأس مال أساسي</td>
                                </tr>
                                <tr data-month="july">
                                    <td>J-001</td>
                                    <td>إثبات رأس المال الافتتاحي</td>
                                    <td>2026-07-01</td>
                                    <td>يوليو 2026</td>
                                    <td>301100 (رأس المال)</td>
                                    <td>0</td>
                                    <td>150,000</td>
                                    <td>حقوق الملكية</td>
                                </tr>
                                <tr data-month="july">
                                    <td>J-015</td>
                                    <td>مبيعات متجر إلكتروني فورية - يوليو</td>
                                    <td>2026-07-15</td>
                                    <td>يوليو 2026</td>
                                    <td>101100 (النقدية)</td>
                                    <td>45,000</td>
                                    <td>0</td>
                                    <td>إيرادات محققة</td>
                                </tr>
                                <tr data-month="july">
                                    <td>J-015</td>
                                    <td>مبيعات متجر إلكتروني فورية - يوليو</td>
                                    <td>2026-07-15</td>
                                    <td>يوليو 2026</td>
                                    <td>401100 (إيرادات المبيعات)</td>
                                    <td>0</td>
                                    <td>45,000</td>
                                    <td>إيراد بضاعة</td>
                                </tr>
                                <tr data-month="august">
                                    <td>J-045</td>
                                    <td>مبيعات متجر إلكتروني فورية - أغسطس</td>
                                    <td>2026-08-10</td>
                                    <td>أغسطس 2026</td>
                                    <td>101100 (النقدية)</td>
                                    <td>65,000</td>
                                    <td>0</td>
                                    <td>إيرادات محققة</td>
                                </tr>
                                <tr data-month="august">
                                    <td>J-045</td>
                                    <td>مبيعات متجر إلكتروني فورية - أغسطس</td>
                                    <td>2026-08-10</td>
                                    <td>أغسطس 2026</td>
                                    <td>401100 (إيرادات المبيعات)</td>
                                    <td>0</td>
                                    <td>65,000</td>
                                    <td>إيراد بضاعة</td>
                                </tr>
                                <tr data-month="september">
                                    <td>J-080</td>
                                    <td>مبيعات متجر إلكتروني فورية - سبتمبر</td>
                                    <td>2026-09-12</td>
                                    <td>سبتمبر 2026</td>
                                    <td>101100 (النقدية)</td>
                                    <td>80,000</td>
                                    <td>0</td>
                                    <td>إيرادات محققة</td>
                                </tr>
                                <tr data-month="september">
                                    <td>J-080</td>
                                    <td>مبيعات متجر إلكتروني فورية - سبتمبر</td>
                                    <td>2026-09-12</td>
                                    <td>سبتمبر 2026</td>
                                    <td>401100 (إيرادات المبيعات)</td>
                                    <td>0</td>
                                    <td>80,000</td>
                                    <td>إيراد بضاعة</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- 2. كشوف الحسابات (الأستاذ العام) -->
                <div id="sec-ledger" class="section-panel active">
                    <h2 data-ar="2. كشوف حسابات الأستاذ العامة" data-en="2. General Ledger Accounts">2. كشوف حسابات الأستاذ العامة</h2>
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th data-ar="كود الحساب" data-en="Account Code">كود الحساب</th>
                                    <th data-ar="اسم الحساب" data-en="Account Name">اسم الحساب</th>
                                    <th data-ar="إجمالي المدين" data-en="Total Debit">إجمالي المدين</th>
                                    <th data-ar="إجمالي الدائن" data-en="Total Credit">إجمالي الدائن</th>
                                    <th data-ar="الرصيد الختامي" data-en="Closing Balance">الرصيد الختامي</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>101100</td>
                                    <td data-ar="النقدية بالبنوك والخزينة" data-en="Cash & Bank">النقدية بالبنوك والخزينة</td>
                                    <td id="ledger_cash_deb">340,000</td>
                                    <td>0</td>
                                    <td style="color:#10b981; font-weight:bold;">340,000 (مدين)</td>
                                </tr>
                                <tr>
                                    <td>301100</td>
                                    <td data-ar="رأس المال" data-en="Capital">رأس المال</td>
                                    <td>0</td>
                                    <td>150,000</td>
                                    <td style="color:#3b82f6; font-weight:bold;">150,000 (دائن)</td>
                                </tr>
                                <tr>
                                    <td>401100</td>
                                    <td data-ar="إيرادات المبيعات الإلكترونية" data-en="E-Commerce Sales Revenue">إيرادات المبيعات الإلكترونية</td>
                                    <td>0</td>
                                    <td id="ledger_rev_cred">190,000</td>
                                    <td style="color:#3b82f6; font-weight:bold;">190,000 (دائن)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- 3. ميزان المراجعة -->
                <div id="sec-tb" class="section-panel active">
                    <h2 data-ar="3. ميزان المراجعة بالمجاميع والأرصدة" data-en="3. Trial Balance">3. ميزان المراجعة بالمجاميع والأرصدة</h2>
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th data-ar="كود الحساب" data-en="Account Code">كود الحساب</th>
                                    <th data-ar="اسم الحساب" data-en="Account Name">اسم الحساب</th>
                                    <th data-ar="مجموع مدين" data-en="Total Debit">مجموع مدين</th>
                                    <th data-ar="مجموع دائن" data-en="Total Credit">مجموع دائن</th>
                                    <th data-ar="رصيد مدين" data-en="Debit Balance">رصيد مدين</th>
                                    <th data-ar="رصيد دائن" data-en="Credit Balance">رصيد دائن</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>101100</td>
                                    <td data-ar="النقدية" data-en="Cash">النقدية</td>
                                    <td id="tb_deb_1">340,000</td>
                                    <td>0</td>
                                    <td id="tb_baldeb_1">340,000</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td>301100</td>
                                    <td data-ar="رأس المال" data-en="Capital">رأس المال</td>
                                    <td>0</td>
                                    <td>150,000</td>
                                    <td>0</td>
                                    <td>150,000</td>
                                </tr>
                                <tr>
                                    <td>401100</td>
                                    <td data-ar="إيرادات المبيعات" data-en="Sales Revenue">إيرادات المبيعات</td>
                                    <td>0</td>
                                    <td id="tb_cred_2">190,000</td>
                                    <td>0</td>
                                    <td id="tb_balcred_2">190,000</td>
                                </tr>
                                <tr style="font-weight: bold; background: #f8fafc;">
                                    <td colspan="2" data-ar="الإجمالي المتطابق" data-en="Total Balanced">الإجمالي المتطابق</td>
                                    <td id="tot_deb_fin">340,000</td>
                                    <td id="tot_cred_fin">340,000</td>
                                    <td id="tot_baldeb_fin">340,000</td>
                                    <td id="tot_balcred_fin">340,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- 4. مقارنات القوائم المالية عبر 3 أشهر -->
                <div id="sec-reports" class="section-panel active">
                    <h2 data-ar="4. مقارنات قائمة الأرباح والخسائر والمركز المالي (يوليو - سبتمبر 2026)" data-en="4. Income Statement & Balance Sheet Comparisons (July - Sep 2026)">4. مقارنات قائمة الأرباح والخسائر والمركز المالي (يوليو - سبتمبر 2026)</h2>
                    <div class="grid-2">
                        <div class="card-box">
                            <h3 style="color:#2563eb; margin-top:0;" data-ar="قائمة الأرباح والخسائر (الدخل)" data-en="Income Statement (P&L)">قائمة الأرباح والخسائر (الدخل)</h3>
                            <div class="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th data-ar="الشهر المالي" data-en="Month">الشهر المالي</th>
                                            <th data-ar="الإيرادات" data-en="Revenues">الإيرادات</th>
                                            <th data-ar="المصروفات" data-en="Expenses">المصروفات</th>
                                            <th data-ar="صافي الربح" data-en="Net Profit">صافي الربح</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td data-ar="يوليو (بداية السنة)" data-en="July (Year Start)">يوليو (بداية السنة)</td>
                                            <td>45,000 ريال</td>
                                            <td>0 ريال</td>
                                            <td style="color:#10b981; font-weight:bold;">45,000 ريال</td>
                                        </tr>
                                        <tr>
                                            <td data-ar="أغسطس 2026" data-en="August 2026">أغسطس 2026</td>
                                            <td>65,000 ريال</td>
                                            <td>0 ريال</td>
                                            <td style="color:#10b981; font-weight:bold;">65,000 ريال</td>
                                        </tr>
                                        <tr>
                                            <td data-ar="سبتمبر 2026" data-en="September 2026">سبتمبر 2026</td>
                                            <td id="sep_rev">80,000 ريال</td>
                                            <td>0 ريال</td>
                                            <td style="color:#10b981; font-weight:bold;" id="sep_net">80,000 ريال</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="card-box">
                            <h3 style="color:#2563eb; margin-top:0;" data-ar="قائمة المركز المالي (الميزانية)" data-en="Balance Sheet">قائمة المركز المالي (الميزانية)</h3>
                            <div class="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th data-ar="الشهر المالي" data-en="Month">الشهر المالي</th>
                                            <th data-ar="إجمالي الأصول (النقدية)" data-en="Total Assets (Cash)">إجمالي الأصول (النقدية)</th>
                                            <th data-ar="حقوق الملكية والربحية" data-en="Equity & Earnings">حقوق الملكية والربحية</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td data-ar="يوليو 2026" data-en="July 2026">يوليو 2026</td>
                                            <td>195,000 ريال</td>
                                            <td>195,000 ريال</td>
                                        </tr>
                                        <tr>
                                            <td data-ar="أغسطس 2026" data-en="August 2026">أغسطس 2026</td>
                                            <td>260,000 ريال</td>
                                            <td>260,000 ريال</td>
                                        </tr>
                                        <tr>
                                            <td data-ar="سبتمبر 2026" data-en="September 2026">سبتمبر 2026</td>
                                            <td id="sep_asset">340,000 ريال</td>
                                            <td id="sep_equity">340,000 ريال</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 5. المؤشرات المالية الشائعة والرسوم البيانية -->
                <div id="sec-indicators" class="section-panel active">
                    <h2 data-ar="5. المؤشرات المالية الاستراتيجية للمدير المالي والرسوم البيانية" data-en="5. Strategic Financial Indicators & Charts">5. المؤشرات المالية الاستراتيجية للمدير المالي والرسوم البيانية</h2>
                    
                    <div class="grid-2" style="margin-bottom: 25px;">
                        <div>
                            <div class="indicator-card">
                                <div class="indicator-title" data-ar="1. نسبة التداول (Current Ratio)" data-en="1. Current Ratio">1. نسبة التداول (Current Ratio)</div>
                                <div class="indicator-desc" data-ar="المعادلة: الأصول المتداولة ÷ الالتزامات المتداولة. القياس الحالي: 2.5x (يدل على قدرة ممتازة على تغطية الالتزامات قصيرة الأجل)." data-en="Formula: Current Assets / Current Liabilities. Current Value: 2.5x (Indicates excellent short-term solvency).">المعادلة: الأصول المتداولة ÷ الالتزامات المتداولة. القياس الحالي: 2.5x (يدل على قدرة ممتازة على تغطية الالتزامات قصيرة الأجل).</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-title" data-ar="2. العائد على الأصول (ROA - Return on Assets)" data-en="2. Return on Assets (ROA)">2. العائد على الأصول (ROA - Return on Assets)</div>
                                <div class="indicator-desc" data-ar="المعادلة: (صافي الربح ÷ إجمالي الأصول) × 100. القياس الحالي: 55.8% (يعكس كفاءة عالية جداً في توظيف الأصول لتوليد الأرباح)." data-en="Formula: (Net Income / Total Assets) * 100. Current Value: 55.8% (Reflects high asset efficiency).">المعادلة: (صافي الربح ÷ إجمالي الأصول) × 100. القياس الحالي: 55.8% (يعكس كفاءة عالية جداً في توظيف الأصول لتوليد الأرباح).</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-title" data-ar="3. هامش صافي الربح (Net Profit Margin)" data-en="3. Net Profit Margin">3. هامش صافي الربح (Net Profit Margin)</div>
                                <div class="indicator-desc" data-ar="المعادلة: (صافي الربح ÷ إجمالي الإيرادات) × 100. القياس الحالي: 100% (نظراً لعدم وجود مصروفات تشغيلية مسجلة بعد في مرحلة المحاكاة التأسيسية)." data-en="Formula: (Net Income / Total Revenue) * 100. Current Value: 100% (Due to zero operating expenses in foundation simulation).">المعادلة: (صافي الربح ÷ إجمالي الإيرادات) × 100. القياس الحالي: 100% (نظراً لعدم وجود مصروفات تشغيلية مسجلة بعد في مرحلة المحاكاة التأسيسية).</div>
                            </div>
                        </div>
                        <div class="card-box">
                            <h3 data-ar="مخطط نمو الإيرادات والأصول الشهرية" data-en="Monthly Revenue & Asset Growth Chart">مخطط نمو الإيرادات والأصول الشهرية</h3>
                            <canvas id="quarterlyChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                // المتغيرات العامة للحسابات
                let totalCash = 340000;
                let totalRevenues = 190000;
                let sepRevenues = 80000;
                let currentLang = 'ar';

                /**
                 * دالة تبديل اللغات (عربي / إنجليزي)
                 */
                function toggleLanguage() {
                    currentLang = currentLang === 'ar' ? 'en' : 'ar';
                    document.getElementById('htmlRoot').setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
                    document.getElementById('htmlRoot').setAttribute('lang', currentLang);
                    
                    const elements = document.querySelectorAll('[data-ar]');
                    elements.forEach(el => {
                        const translation = el.getAttribute('data-' + currentLang);
                        if (translation) {
                            if(el.tagName === 'INPUT' || el.tagName === 'SELECT') {
                                el.placeholder = translation;
                            } else {
                                el.innerText = translation;
                            }
                        }
                    });
                }

                /**
                 * دالة التحكم في إظهار وإخفاء الأقسام بالأزرار الملونة
                 */
                function showSection(type) {
                    const panels = document.querySelectorAll('.section-panel');
                    if (type === 'all') {
                        panels.forEach(p => p.classList.add('active'));
                    } else {
                        panels.forEach(p => p.classList.remove('active'));
                        document.getElementById('sec-' + type).classList.add('active');
                    }
                }

                /**
                 * دالة فلترة البيانات حسب الشهر أو الربع سنوي
                 */
                function filterDataByPeriod() {
                    const period = document.getElementById('periodFilter').value;
                    const rows = document.querySelectorAll('#journalBody tr');
                    rows.forEach(row => {
                        const monthAttr = row.getAttribute('data-month');
                        if (period === 'all' || monthAttr === period) {
                            row.style.display = '';
                        } else {
                            row.style.display = 'none';
                        }
                    });
                }

                /**
                 * دالة تحديث المبلغ الافتراضي حسب نوع معاملة التجارة الإلكترونية المختارة
                 */
                function updateDefaultAmount() {
                    const type = document.getElementById('ecommerceType').value;
                    const amountInput = document.getElementById('txAmount');
                    if(type.includes('مرتجعات')) amountInput.value = 1200;
                    else if(type.includes('شحن')) amountInput.value = 800;
                    else if(type.includes('تسويق')) amountInput.value = 3500;
                    else amountInput.value = 5000;
                }

                /**
                 * دالة توليد معاملة مالية جديدة وتحديث النتائج فوراً
                 */
                function addNewTransaction() {
                    const type = document.getElementById('ecommerceType').value;
                    const amount = parseFloat(document.getElementById('txAmount')) || 5000;
                    const month = document.getElementById('txMonth').value;

                    totalCash += amount;
                    totalRevenues += amount;
                    if(month.includes('سبتمبر')) {
                        sepRevenues += amount;
                    }

                    // إضافة قيد جديد لدفتر اليومية
                    const tbody = document.getElementById('journalBody');
                    let r1 = tbody.insertRow();
                    let r2 = tbody.insertRow();

                    const monthKey = month.includes('يوليو') ? 'july' : (month.includes('أغسطس') ? 'august' : 'september');
                    r1.setAttribute('data-month', monthKey);
                    r2.setAttribute('data-month', monthKey);

                    r1.innerHTML = \`<td>J-90X</td><td>\${type}</td><td>2026-09-25</td><td>\${month}</td><td>101100 (النقدية)</td><td>\${amount.toLocaleString()}</td><td>0</td><td>تداول إلكتروني فوري</td>\`;
                    r2.innerHTML = \`<td>J-90X</td><td>\${type}</td><td>2026-09-25</td><td>\${month}</td><td>401100 (الإيرادات)</td><td>0</td><td>\${amount.toLocaleString()}</td><td>إيراد محقق</td>\`;

                    // تحديث الأرقام بصرياً
                    document.getElementById('ledger_cash_deb').innerText = totalCash.toLocaleString();
                    document.getElementById('ledger_rev_cred').innerText = totalRevenues.toLocaleString();
                    document.getElementById('tb_deb_1').innerText = totalCash.toLocaleString();
                    document.getElementById('tb_baldeb_1').innerText = totalCash.toLocaleString();
                    document.getElementById('tb_cred_2').innerText = totalRevenues.toLocaleString();
                    document.getElementById('tb_balcred_2').innerText = totalRevenues.toLocaleString();
                    document.getElementById('tot_deb_fin').innerText = totalCash.toLocaleString();
                    document.getElementById('tot_cred_fin').innerText = totalCash.toLocaleString();
                    document.getElementById('tot_baldeb_fin').innerText = totalCash.toLocaleString();
                    document.getElementById('tot_balcred_fin').innerText = totalCash.toLocaleString();

                    document.getElementById('sep_rev').innerText = sepRevenues.toLocaleString() + ' ريال';
                    document.getElementById('sep_net').innerText = sepRevenues.toLocaleString() + ' ريال';
                    document.getElementById('sep_asset').innerText = totalCash.toLocaleString() + ' ريال';
                    document.getElementById('sep_equity').innerText = totalCash.toLocaleString() + ' ريال';

                    alert(currentLang === 'ar' ? 'تم توليد المعاملة وتحديث الدورة المحاسبية والقوائم بنجاح تام!' : 'Transaction generated and accounting cycle updated successfully!');
                }

                // إعداد المخطط البياني التفاعلي عبر Chart.js
                const ctx = document.getElementById('quarterlyChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['يوليو 2026', 'أغسطس 2026', 'سبتمبر 2026'],
                        datasets: [{
                            label: 'نمو الإيرادات الشهرية (ريال)',
                            data: [45000, 65000, 80000],
                            backgroundColor: '#0284c7',
                            borderRadius: 6
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: { legend: { position: 'top' } }
                    }
                });
            </script>
        </body>
    </html>
    `;
}

/**
 * ----------------------------------------------------------------------------
 * مسار العرض التفاعلي الرئيسي (GET /demo)
 * ----------------------------------------------------------------------------
 */
app.get('/demo', (req, res) => {
    res.status(200).send(renderAccountingDemoHTML());
});

// تشغيل الخادم على المنفذ المحدد
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Accounting Backend Server (AI-ACC TaaS) is running on port ${PORT}`);
});
