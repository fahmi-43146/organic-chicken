"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Upload, RefreshCw, Database, Bell, Shield, Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"

export default function SettingsManagement() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(key as any, language)

  const [storeSettings, setStoreSettings] = useState({
    store_name_ar: "مزرعة هادي مشعب",
    store_name_en: "Hedi Mchaab Farm",
    store_name_fr: "Ferme Hedi Mchaab",
    description_ar: "أفضل أنواع الدجاج العضوي الطازج في تونس",
    description_en: "The finest organic fresh chicken in Tunisia",
    description_fr: "Le meilleur poulet biologique frais en Tunisie",
    email: "hedi@organicchicken.tn",
    phone: "+216 12 345 678",
    address_ar: "طريق صفاقس، تونس 1234",
    address_en: "Sfax Road, Tunis 1234",
    address_fr: "Route de Sfax, Tunis 1234",
    currency: "TND",
    tax_rate: 19,
    delivery_fee: 5.0,
    free_delivery_threshold: 100.0,
    is_store_open: true,
    maintenance_mode: false,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    email_notifications: true,
    sms_notifications: false,
    order_notifications: true,
    low_stock_alerts: true,
    customer_messages: true,
    marketing_emails: false,
  })

  const [securitySettings, setSecuritySettings] = useState({
    two_factor_auth: false,
    session_timeout: 30,
    password_expiry: 90,
    login_attempts: 5,
    require_email_verification: true,
  })

  const handleStoreSettingChange = (field: string, value: any) => {
    setStoreSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSecurityChange = (field: string, value: any) => {
    setSecuritySettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveSettings = () => {
    // Here you would save to database
    console.log("Saving settings:", { storeSettings, notificationSettings, securitySettings })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("settings")}</h1>
          <p className="text-muted-foreground">
            {language === "ar" ? "إدارة إعدادات المتجر والنظام" : "Manage store and system settings"}
          </p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
          {language === "ar" ? "حفظ الإعدادات" : "Save Settings"}
        </Button>
      </div>

      <Tabs defaultValue="store" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="store">
            <Globe className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
            {language === "ar" ? "المتجر" : "Store"}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
            {language === "ar" ? "الإشعارات" : "Notifications"}
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
            {language === "ar" ? "الأمان" : "Security"}
          </TabsTrigger>
          <TabsTrigger value="database">
            <Database className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
            {language === "ar" ? "قاعدة البيانات" : "Database"}
          </TabsTrigger>
          <TabsTrigger value="advanced">{language === "ar" ? "متقدم" : "Advanced"}</TabsTrigger>
        </TabsList>

        <TabsContent value="store" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "ar" ? "معلومات المتجر الأساسية" : "Basic Store Information"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>{language === "ar" ? "اسم المتجر بالعربية" : "Store Name (Arabic)"}</Label>
                  <Input
                    value={storeSettings.store_name_ar}
                    onChange={(e) => handleStoreSettingChange("store_name_ar", e.target.value)}
                    dir="rtl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{language === "ar" ? "اسم المتجر بالإنجليزية" : "Store Name (English)"}</Label>
                  <Input
                    value={storeSettings.store_name_en}
                    onChange={(e) => handleStoreSettingChange("store_name_en", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{language === "ar" ? "اسم المتجر بالفرنسية" : "Store Name (French)"}</Label>
                  <Input
                    value={storeSettings.store_name_fr}
                    onChange={(e) => handleStoreSettingChange("store_name_fr", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>{language === "ar" ? "الوصف بالعربية" : "Description (Arabic)"}</Label>
                  <Textarea
                    value={storeSettings.description_ar}
                    onChange={(e) => handleStoreSettingChange("description_ar", e.target.value)}
                    dir="rtl"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{language === "ar" ? "الوصف بالإنجليزية" : "Description (English)"}</Label>
                  <Textarea
                    value={storeSettings.description_en}
                    onChange={(e) => handleStoreSettingChange("description_en", e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{language === "ar" ? "الوصف بالفرنسية" : "Description (French)"}</Label>
                  <Textarea
                    value={storeSettings.description_fr}
                    onChange={(e) => handleStoreSettingChange("description_fr", e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "ar" ? "معلومات الاتصال" : "Contact Information"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{language === "ar" ? "البريد الإلكتروني" : "Email"}</Label>
                  <Input
                    type="email"
                    value={storeSettings.email}
                    onChange={(e) => handleStoreSettingChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{language === "ar" ? "رقم الهاتف" : "Phone"}</Label>
                  <Input
                    value={storeSettings.phone}
                    onChange={(e) => handleStoreSettingChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>{language === "ar" ? "العنوان بالعربية" : "Address (Arabic)"}</Label>
                  <Input
                    value={storeSettings.address_ar}
                    onChange={(e) => handleStoreSettingChange("address_ar", e.target.value)}
                    dir="rtl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{language === "ar" ? "العنوان بالإنجليزية" : "Address (English)"}</Label>
                  <Input
                    value={storeSettings.address_en}
                    onChange={(e) => handleStoreSettingChange("address_en", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{language === "ar" ? "العنوان بالفرنسية" : "Address (French)"}</Label>
                  <Input
                    value={storeSettings.address_fr}
                    onChange={(e) => handleStoreSettingChange("address_fr", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "ar" ? "إعدادات التجارة" : "Commerce Settings"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>{language === "ar" ? "العملة" : "Currency"}</Label>
                  <Select
                    value={storeSettings.currency}
                    onValueChange={(value) => handleStoreSettingChange("currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TND">TND - {language === "ar" ? "دينار تونسي" : "Tunisian Dinar"}</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{language === "ar" ? "معدل الضريبة (%)" : "Tax Rate (%)"}</Label>
                  <Input
                    type="number"
                    value={storeSettings.tax_rate}
                    onChange={(e) => handleStoreSettingChange("tax_rate", Number.parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{language === "ar" ? "رسوم التوصيل" : "Delivery Fee"}</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={storeSettings.delivery_fee}
                    onChange={(e) => handleStoreSettingChange("delivery_fee", Number.parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{language === "ar" ? "حد التوصيل المجاني" : "Free Delivery Threshold"}</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={storeSettings.free_delivery_threshold}
                    onChange={(e) =>
                      handleStoreSettingChange("free_delivery_threshold", Number.parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-0.5">
                  <Label>{language === "ar" ? "المتجر مفتوح" : "Store Open"}</Label>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar" ? "السماح بالطلبات الجديدة" : "Allow new orders"}
                  </p>
                </div>
                <Switch
                  checked={storeSettings.is_store_open}
                  onCheckedChange={(checked) => handleStoreSettingChange("is_store_open", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{language === "ar" ? "وضع الصيانة" : "Maintenance Mode"}</Label>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar" ? "إغلاق المتجر مؤقتاً للصيانة" : "Temporarily close store for maintenance"}
                  </p>
                </div>
                <Switch
                  checked={storeSettings.maintenance_mode}
                  onCheckedChange={(checked) => handleStoreSettingChange("maintenance_mode", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "ar" ? "إعدادات الإشعارات" : "Notification Settings"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{language === "ar" ? "إشعارات البريد الإلكتروني" : "Email Notifications"}</Label>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? "تلقي الإشعارات عبر البريد الإلكتروني" : "Receive notifications via email"}
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.email_notifications}
                    onCheckedChange={(checked) => handleNotificationChange("email_notifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{language === "ar" ? "إشعارات الرسائل النصية" : "SMS Notifications"}</Label>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? "تلقي الإشعارات عبر الرسائل النصية" : "Receive notifications via SMS"}
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.sms_notifications}
                    onCheckedChange={(checked) => handleNotificationChange("sms_notifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{language === "ar" ? "إشعارات الطلبات" : "Order Notifications"}</Label>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? "إشعار عند وصول طلبات جديدة" : "Notify when new orders arrive"}
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.order_notifications}
                    onCheckedChange={(checked) => handleNotificationChange("order_notifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{language === "ar" ? "تنبيهات نفاد المخزون" : "Low Stock Alerts"}</Label>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? "تنبيه عند انخفاض المخزون" : "Alert when stock is running low"}
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.low_stock_alerts}
                    onCheckedChange={(checked) => handleNotificationChange("low_stock_alerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{language === "ar" ? "رسائل العملاء" : "Customer Messages"}</Label>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? "إشعار عند وصول رسائل من العملاء" : "Notify when customers send messages"}
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.customer_messages}
                    onCheckedChange={(checked) => handleNotificationChange("customer_messages", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{language === "ar" ? "رسائل التسويق" : "Marketing Emails"}</Label>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? "إرسال رسائل تسويقية للعملاء" : "Send marketing emails to customers"}
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketing_emails}
                    onCheckedChange={(checked) => handleNotificationChange("marketing_emails", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "ar" ? "إعدادات الأمان" : "Security Settings"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{language === "ar" ? "المصادقة الثنائية" : "Two-Factor Authentication"}</Label>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar"
                        ? "تفعيل المصادقة الثنائية للحسابات"
                        : "Enable two-factor authentication for accounts"}
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.two_factor_auth}
                    onCheckedChange={(checked) => handleSecurityChange("two_factor_auth", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{language === "ar" ? "التحقق من البريد الإلكتروني" : "Email Verification Required"}</Label>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar"
                        ? "طلب التحقق من البريد عند التسجيل"
                        : "Require email verification on registration"}
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.require_email_verification}
                    onCheckedChange={(checked) => handleSecurityChange("require_email_verification", checked)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>{language === "ar" ? "انتهاء الجلسة (دقيقة)" : "Session Timeout (minutes)"}</Label>
                    <Input
                      type="number"
                      value={securitySettings.session_timeout}
                      onChange={(e) => handleSecurityChange("session_timeout", Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{language === "ar" ? "انتهاء كلمة المرور (يوم)" : "Password Expiry (days)"}</Label>
                    <Input
                      type="number"
                      value={securitySettings.password_expiry}
                      onChange={(e) => handleSecurityChange("password_expiry", Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{language === "ar" ? "محاولات تسجيل الدخول" : "Login Attempts"}</Label>
                    <Input
                      type="number"
                      value={securitySettings.login_attempts}
                      onChange={(e) => handleSecurityChange("login_attempts", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "ar" ? "إدارة قاعدة البيانات" : "Database Management"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{language === "ar" ? "النسخ الاحتياطي" : "Backup"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? "إنشاء نسخة احتياطية من قاعدة البيانات" : "Create a backup of the database"}
                    </p>
                    <Button className="w-full">
                      <Upload className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      {language === "ar" ? "إنشاء نسخة احتياطية" : "Create Backup"}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{language === "ar" ? "الاستعادة" : "Restore"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? "استعادة قاعدة البيانات من نسخة احتياطية" : "Restore database from backup"}
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      <RefreshCw className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      {language === "ar" ? "استعادة" : "Restore"}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {language === "ar" ? "حالة قاعدة البيانات" : "Database Status"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">✓</div>
                      <div className="text-sm">{language === "ar" ? "متصل" : "Connected"}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">2.1GB</div>
                      <div className="text-sm">{language === "ar" ? "حجم البيانات" : "Data Size"}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">1,234</div>
                      <div className="text-sm">{language === "ar" ? "السجلات" : "Records"}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">99.9%</div>
                      <div className="text-sm">{language === "ar" ? "وقت التشغيل" : "Uptime"}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "ar" ? "الإعدادات المتقدمة" : "Advanced Settings"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    {language === "ar" ? "تحذير" : "Warning"}
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    {language === "ar"
                      ? "هذه الإعدادات للمستخدمين المتقدمين فقط. تغييرها قد يؤثر على أداء النظام."
                      : "These settings are for advanced users only. Changing them may affect system performance."}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>{language === "ar" ? "مفتاح API" : "API Key"}</Label>
                    <div className="flex gap-2">
                      <Input value="sk-1234567890abcdef" readOnly className="font-mono" />
                      <Button variant="outline">{language === "ar" ? "تجديد" : "Regenerate"}</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{language === "ar" ? "رابط Webhook" : "Webhook URL"}</Label>
                    <Input placeholder="https://your-domain.com/webhook" />
                  </div>

                  <div className="space-y-2">
                    <Label>{language === "ar" ? "إعدادات مخصصة (JSON)" : "Custom Settings (JSON)"}</Label>
                    <Textarea placeholder='{"custom_setting": "value"}' rows={4} className="font-mono" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
