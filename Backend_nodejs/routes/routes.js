const router = require('express').Router();

const { chpForgotPassword } = require('../app/controllers/authentication/chp/chp_forgot_password');
const { chpInitialPasswordChange } = require('../app/controllers/authentication/chp/chp_one_pass_change');
const { registerChps } = require('../app/controllers/authentication/chp/chp_registration');
const { resendPasswordOtpChp } = require('../app/controllers/authentication/chp/chp_resend_passotp');
const { chpResetPassword } = require('../app/controllers/authentication/chp/chp_reset_password');
const { login } = require('../app/controllers/authentication/login/login');

const { patientForgotPassword } = require('../app/controllers/authentication/patient/patient_forgot_password');
const { verifyOtpAndSavePatient } = require('../app/controllers/authentication/patient/patient_otp_verification');
const {registerPatient} = require('../app/controllers/authentication/patient/patient_registration')
const { resendOtpPatient } = require('../app/controllers/authentication/patient/patient_resend_otp');
const { resendPassOtpPatient } = require('../app/controllers/authentication/patient/patient_resend_passotp');
const { patientResetPassword } = require('../app/controllers/authentication/patient/patient_reset_password');
const { verifyPatientPassOtp } = require('../app/controllers/authentication/patient/patient_verify_passotp');

const { getAllChps } = require('../app/controllers/user_controllers/chp_controller/get_all_chps');
const {verifyRoles} = require('../app/controllers/verify token/verify_roles');
const { verifyAccessToken } = require('../app/controllers/verify token/verify_access_token');
const { registerAdmins } = require('../app/controllers/authentication/admin/admin_registration');
const { getAllChildHealthAssessmentRecords, getChildHealthAssessmentRecord } = require('../app/controllers/chp_controllers/child_health_controller/view_child_health_status');
const { createChildHealthAssessmentRecord } = require('../app/controllers/chp_controllers/child_health_controller/add_child_health_status');
const { getAllPregnancyAssessmentRecords, getPregnancyAssessmentRecord } = require('../app/controllers/chp_controllers/pregnancy_assessment/view_pregnancy_assessmtnt');
const { createPregnancyAssessmentRecord } = require('../app/controllers/chp_controllers/pregnancy_assessment/add_pregnancy_assessment');
const { getAllHouseholds } = require('../app/controllers/chp_controllers/household_controller/get_all_household');
const { createHousehold } = require('../app/controllers/chp_controllers/household_controller/create_household');
const { getOneHousehold } = require('../app/controllers/chp_controllers/household_controller/get_one _household');
const { updateHousehold } = require('../app/controllers/chp_controllers/household_controller/update_household');
const { deleteHousehold } = require('../app/controllers/chp_controllers/household_controller/delete_household');
const { getAllHouseholdsMembers } = require('../app/controllers/chp_controllers/househod_member_controllers/get_all_households_members');
const { createHouseholdMember } = require('../app/controllers/chp_controllers/househod_member_controllers/create_household_member');
const { getHouseholdMembers } = require('../app/controllers/chp_controllers/househod_member_controllers/get-all_household_members');
const { createMedicalReportingForm } = require('../app/controllers/chp_controllers/medical_reporting_form/create_med_reporting_form');
const { getAllMedicalReportingForms } = require('../app/controllers/chp_controllers/medical_reporting_form/get_all_med_reporting_form');
const { getMedicalReportingFormById } = require('../app/controllers/chp_controllers/medical_reporting_form/get_one_med_reporting_form');
const { updateMedicalReportingFormById } = require('../app/controllers/chp_controllers/medical_reporting_form/update_med_reporting_form');
const { deleteMedicalReportingFormById } = require('../app/controllers/chp_controllers/medical_reporting_form/delete_med_reporting_form');

const { adminInitialPasswordChange } = require('../app/controllers/authentication/admin/admin_one_pass_change');
const { adminForgotPassword } = require('../app/controllers/authentication/admin/admin_forgot_password');
const { adminResetPassword } = require('../app/controllers/authentication/admin/admin_reset_password');
const { resendPasswordOtpAdmin } = require('../app/controllers/authentication/admin/admin_resend_passotp');
const { adminChangeExpiredPassword } = require('../app/controllers/authentication/admin/admin_change_expired_password');
const { chpChangeExpiredPassword } = require('../app/controllers/authentication/chp/chp_change_expired_password');
const { adminResetExpiredPassword } = require('../app/controllers/authentication/admin/admin_reset_expired_password');
const { chpResetExpiredPassword } = require('../app/controllers/authentication/chp/chp_reset_expired_password');
const { resendExpiredPasswordOtpAdmin } = require('../app/controllers/authentication/admin/admin_resend_expired_passotp');
const { getOneAdmin } = require('../app/controllers/user_controllers/admin_controller/get_admin.js')
const { getAllAdmins } = require('../app/controllers/user_controllers/admin_controller/get_all_admin.js')
const { deleteOneAdmin } = require('../app/controllers/user_controllers/admin_controller/delete_admin.js')
const { updateAdmin } = require('../app/controllers/user_controllers/admin_controller/update_admin.js')

const { resendExpiredPasswordOtpChp } = require('../app/controllers/authentication/chp/chp_resend_expired_passotp');
const { registerDoctors } = require('../app/controllers/authentication/doctor/doctor_registration');
const { doctorInitiallPasswordChange } = require('../app/controllers/authentication/doctor/doctor_one_pass_change');
const { doctorForgotPassword } = require('../app/controllers/authentication/doctor/doctor_forgot_password');
const { doctorResetPassword } = require('../app/controllers/authentication/doctor/doctor_reset_password');
const { doctorResendOtp } = require('../app/controllers/authentication/doctor/doctor_resend_passotp');
const {roles} = require('../app/models/user_models/roles');
const { getLogs } = require('../app/controllers/logs_controller/logs');

const { createRecord} = require('../app/controllers/health_controllers/create_records')
const { viewLabResults} = require('../app/controllers/health_controllers/view_lab_results')
const { downloadLabResults } = require('../app/controllers/health_controllers/download_lab_results');
const { viewHealthRecords } = require('../app/controllers/health_controllers/view_health_records');
const { displayPressureMap } = require('../app/controllers/health_controllers/pressure_map') 
const { uploadLabResults } = require('../app/controllers/health_controllers/upload_lab_results')
const upload = require('../app/controllers/health_controllers/multer_config');

const { getLogsForLogins } = require('../app/controllers/logs_controller/login_logs');
const { doctorChangeExpiredPassword } = require('../app/controllers/authentication/doctor/doctor_change_expired_password');
const { doctorResetExpiredPassword } = require('../app/controllers/authentication/doctor/doctor_reset_expired_password');
const { resendExpiredPasswordOtpDoctor } = require('../app/controllers/authentication/doctor/doctor_resend_expired_passotp');
const {  getSinglePatientAppointments } = require('../app/controllers/appointment_controller/get_single_appointments');

const { addBillingWithServices } = require('../app/controllers/billing_and_payment_controller/add_billing_controller');
const { addTeleafyaClinic } = require('../app/controllers/teleafya_clinics_controllers/add_teleafya_clinic');
const { getAllTeleafyaClinics } = require('../app/controllers/teleafya_clinics_controllers/get_all_teleafya');
const { makeStkPayment } = require('../app/controllers/billing_and_payment_controller/make_stk_payment');
const { getAllBillings } = require('../app/controllers/billing_and_payment_controller/get_all_billing_controller');
const { callback } = require('../app/controllers/m_pesa_callback/callback');
const { getPatientAllBillings } = require('../app/controllers/billing_and_payment_controller/get_one_patient_billing');
const { verifyRefreshToken } = require('../app/controllers/verify token/verify_refresh_token');
const { generateNewAccessToken } = require('../app/controllers/verify token/generate_subsequent_token');
const { logout } = require('../app/controllers/authentication/logout/logout');
const { createNewProduct } = require('../app/controllers/epharmacy_controllers/product_controllers/add_new_product');
const { getOneProduct } = require('../app/controllers/epharmacy_controllers/product_controllers/get_one_product');
const { getAllProducts } = require('../app/controllers/epharmacy_controllers/product_controllers/get_all_products');
const { updateProduct } = require('../app/controllers/epharmacy_controllers/product_controllers/update_product');
const { deleteProduct } = require('../app/controllers/epharmacy_controllers/product_controllers/delete_product');
const { createNewCart } = require('../app/controllers/epharmacy_controllers/cart_contollers/add_cart');
const { getUserCart } = require('../app/controllers/epharmacy_controllers/cart_contollers/get_oneuser_cart');
const { getAllUserCarts } = require('../app/controllers/epharmacy_controllers/cart_contollers/get_alluser_carts');
const { updateUserCart } = require('../app/controllers/epharmacy_controllers/cart_contollers/update_cart');
const { deleteCart } = require('../app/controllers/epharmacy_controllers/cart_contollers/delete_cart');
const { addOrderWithProducts } = require('../app/controllers/epharmacy_controllers/order_controller/add_order_controller');
const { getPatientAllOrders } = require('../app/controllers/epharmacy_controllers/order_controller/get_onepatient_orders');
const { getAllOrders } = require('../app/controllers/epharmacy_controllers/order_controller/get_all_orders_controller');
const { makeCardPayment } = require('../app/controllers/billing_and_payment_controller/make_card_payment');

const { createAppointment } = require('../app/controllers/appointment_controller/book_appointment');
const { approveAppointment } = require('../app/controllers/appointment_controller/approve_bookings');
const { getAllAppointments} = require('../app/controllers/appointment_controller/get_all_appointments');
const { unApprovedBookings } = require('../app/controllers/appointment_controller/unapproved_appoinments');
const { approvedBookings } = require('../app/controllers/appointment_controller/doctor_approved_appointments');
const { appointmentStatus } = require('../app/controllers/appointment_controller/get_single_appointment_status');
const { getAllPatients } = require('../app/controllers/user_controllers/patient_controller/get_all_patients');
const { getOnePatient } = require('../app/controllers/user_controllers/patient_controller/get_one_patient');
const { updatePatientDetails } = require('../app/controllers/user_controllers/patient_controller/update_patient');
const { deleteAllNotifications } = require('../app/controllers/appointment_controller/delete_all_notifications');
const { cancelAppointment } = require('../app/controllers/appointment_controller/cancel_appointment');
const { getAllApprovedAppointments } = require('../app/controllers/appointment_controller/admin_approved_appointments')

const { productImageUpload } = require('../app/controllers/epharmacy_controllers/product_controllers/add_product_image');

const {  uploadPatientProfileImage } = require('../app/controllers/file_management_controller/profile_controller/settings/patient_profile_controller/patient_upload_images');
const { viewPatientProfile  } = require('../app/controllers/file_management_controller/profile_controller/settings/patient_profile_controller/patient_view_profile');
const { updatePatientProfile} = require('../app/controllers/file_management_controller/profile_controller/settings/patient_profile_controller/update_patient_profile');
const {updatePatientProfileImage} = require('../app/controllers/file_management_controller/profile_controller/settings/patient_profile_controller/patient_profile_picture_update');
const{deletePatientProfilePicture}= require('../app/controllers/file_management_controller/profile_controller/settings/patient_profile_controller/patient_delete_profile_picture');

const { updateChpProfile} = require('../app/controllers/file_management_controller/profile_controller/settings/chp_profile_controller/chp_update_profile');
const {updateChpProfileImage} = require('../app/controllers/file_management_controller/profile_controller/settings/chp_profile_controller/chp_update_profile_image');
const{deleteChpProfilePicture}= require('../app/controllers/file_management_controller/profile_controller/settings/chp_profile_controller/chp_delete_profile_picture');
const { ChpViewProfile } = require('../app/controllers/file_management_controller/profile_controller/settings/chp_profile_controller/chp-view_profile');
const { chpUploadProfileImages } = require('../app/controllers/file_management_controller/profile_controller/settings/chp_profile_controller/chp_upload_images');
const { ViewAdminProfile } = require('../app/controllers/file_management_controller/profile_controller/settings/admin_profile_controller/admin_view_profile');
const { uploadAdminProfileImages } = require('../app/controllers/file_management_controller/profile_controller/settings/admin_profile_controller/admin_upload-images');
const { UpdateAdminProfile } = require('../app/controllers/file_management_controller/profile_controller/settings/admin_profile_controller/admin_update_profile');
const { updateAdminProfileImage } = require('../app/controllers/file_management_controller/profile_controller/settings/admin_profile_controller/admin_profile_image_upload');
const { viewDoctorProfile } = require('../app/controllers/file_management_controller/profile_controller/settings/doctor_profile_controller/doctor_view_profile');

const { registerSuperAdmins } = require('../app/controllers/authentication/super_admin/super_admin_registration');
const { rescheduleAppointment } = require('../app/controllers/appointment_controller/reschedule_appointment');
const { getProfileImage } = require('../app/controllers/file_management_controller/profile_controller/settings/patient_profile_controller/patient_avartar');
const { getNotifications } = require('../app/controllers/appointment_controller/get_notifications');
const { deleteAdminProfilePicture } = require('../app/controllers/file_management_controller/profile_controller/settings/admin_profile_controller/admin_delete_profile_picture');
const { UpdateDoctorProfile } = require('../app/controllers/file_management_controller/profile_controller/settings/doctor_profile_controller/doctor_update_profile');
const { updateDoctorProfileImage } = require('../app/controllers/file_management_controller/profile_controller/settings/doctor_profile_controller/doctor_profile_image_update');
const { deleteDoctorProfilePicture } = require('../app/controllers/file_management_controller/profile_controller/settings/doctor_profile_controller/doctor_delete_profile_pic');
//const { uploadDoctorProfileImage } = require('../app/controllers/file_management_controller/profile_controller/settings/doctor_profile_controller/doctor_upload_images');
const { getAllNotifications } = require('../app/controllers/Notifications/get_notifications');
const { markAsRead } = require('../app/controllers/Notifications/mark_as_read');
const { confirmPayments } = require('../app/controllers/billing_and_payment_controller/confirm_payments');
const { getOnePatientPaymentsRecords } = require('../app/controllers/billing_and_payment_controller/get_one_patient_payment_records');
//const { zoomCallback } = require('../app/util/zoom/zoom_callback');
const { zoomToken } = require('../app/controllers/appointment_controller/zoom');
const { updateChpDetails } = require('../app/controllers/user_controllers/chp_controller/update_chp');
const { updatePharmacistProfileImage } = require('../app/controllers/file_management_controller/profile_controller/settings/pharmacist_profile_controller/pharmacist_profile_picture_update');
const { deletePharmacistProfilePicture } = require('../app/controllers/file_management_controller/profile_controller/settings/pharmacist_profile_controller/pharmacist_delete_profile_picture');
const { updatePharmacistProfile } = require('../app/controllers/file_management_controller/profile_controller/settings/pharmacist_profile_controller/update_pharmacist_profile');
const { addRole } = require('../app/controllers/authentication/roles/add_role');
const { createService } = require('../app/controllers/services_controller/general_consultation_controller/add_service');
const { getAllServices } = require('../app/controllers/services_controller/general_consultation_controller/get_all_services');
const { deleteService } = require('../app/controllers/services_controller/general_consultation_controller/delete_service');
const { updateService } = require('../app/controllers/services_controller/general_consultation_controller/update_service');
const { prescriptionImageUpload } = require('../app/controllers/file_management_controller/prescription_controller/upload_prescription');
const { getAllPrescriptions } = require('../app/controllers/file_management_controller/prescription_controller/view_all_uploads');
const { getAllRoles } = require('../app/controllers/authentication/roles/get_all_roles');
const { getOneChp } = require('../app/controllers/user_controllers/chp_controller/get_one_chp');
const { getAllDoctors } = require('../app/controllers/user_controllers/doctor_controller/get_all_doctors');
const { updateRoles } = require('../app/controllers/authentication/roles/update_role');
const { deleteRoles } = require('../app/controllers/authentication/roles/delete_role');
const { getDoctorProfileImage } = require('../app/controllers/file_management_controller/profile_controller/settings/doctor_profile_controller/doctor_avatar');
const { updateClinic } = require('../app/controllers/teleafya_clinics_controllers/update_teleafya_clinic');
const { deleteClinic } = require('../app/controllers/teleafya_clinics_controllers/delete_teleafya_clinic');
const { cancelOrder } = require('../app/controllers/epharmacy_controllers/order_controller/cancel_order');
const { addDeliveryInformation } = require('../app/controllers/epharmacy_controllers/delivery_info/add_delivery_info');
const { approvePrescription } = require('../app/controllers/file_management_controller/prescription_controller/approve_prescription');
const { declinePrescription } = require('../app/controllers/file_management_controller/prescription_controller/decline_prescription');

const { getAllGeneralServiceDoctors } = require('../app/controllers/user_controllers/doctor_controller/get_general_service_doctors')
const { getOneDoctor } = require('../app/controllers/user_controllers/doctor_controller/get_doctor')
const { deleteDoctor } = require('../app/controllers/user_controllers/doctor_controller/delete_doctor')
const { updateDoctor } = require('../app/controllers/user_controllers/doctor_controller/update_doctor')
const { deletePatient } = require('../app/controllers/user_controllers/patient_controller/delete_patient');
const { addPatientFile } = require('../app/controllers/health_controllers/create_patient_file');
const { getSpecialist } = require('../app/controllers/user_controllers/doctor_controller/get_all_specialist');


// Route for Log in
router.post('/login', login);
router.post('/logout', logout);
router.get('/callback', callback);

router.post('/generatenewaccesstoken', verifyRefreshToken, generateNewAccessToken)


//Routes for handling CHP
router.post('/auth/superadmin/register', registerSuperAdmins)

//Routes for handling CHP
router.post('/auth/chp/register', registerChps);
router.put('/auth/chp/changepassword', chpInitialPasswordChange )
router.post('/auth/chp/forgotpassword', chpForgotPassword);
router.put('/auth/chp/reset-password', chpResetPassword);
router.post('/auth/chp/changeexpiredpassword' , chpChangeExpiredPassword);
router.put('/auth/chp/resetexpiredpassword', chpResetExpiredPassword);
router.post('/auth/chp/resendexpiredpassotp', resendExpiredPasswordOtpChp);
router.post('/auth/chp/resendpassotp', resendPasswordOtpChp );
router.get('/chp/viewonechp/:id', getOneChp );
router.get('/chp/viewallchps', getAllChps);
router.put('/chp/update/:id', updateChpDetails );
router.delete('/chp/deletemyaccount/:id', );

//chp profile management
router.get('/chp/viewProfile',ChpViewProfile)
router.post('/chp/uploadProfileImages',chpUploadProfileImages)
router.put('/chp/updateProfile', updateChpProfile);
router.patch('/chp/updateProfileImage,', updateChpProfileImage);
router.post('/chp/deleteProfilePicture',deleteChpProfilePicture)

//Routes for handling Patients authentication
router.post('/auth/patient/register',  registerPatient );
router.post('/auth/patient/verifyotp', verifyOtpAndSavePatient  ); 
router.post('/auth/patient/resendotp', resendOtpPatient);
router.post('/auth/patient/resendpasswordotp', resendPassOtpPatient  );
router.post('/auth/patient/forgotpassword', patientForgotPassword);
router.post('/auth/patient/verifypasswordotp', verifyPatientPassOtp);
router.put('/auth/patient/resetpassword', patientResetPassword );


router.get('/patient/viewallpatients', getAllPatients );
router.get('/patient/viewonepatient/:id', getOnePatient );
router.put('/patient/update/:id', updatePatientDetails );
router.delete('/patient/deleteaccount/:id', deletePatient);
router.delete('/patient/deleteaccountbyadmin/:id');

//Routes for handling patient profile management
router.get('/patient/viewPatientProfile/:id',viewPatientProfile );
router.post('/patient/uploadProfileImages/:id', uploadPatientProfileImage);
router.put('/patient/updateProfile', updatePatientProfile);
router.patch('/patient/updateProfileImage', updatePatientProfileImage);
router.delete('/patient/deleteProfilePicture', deletePatientProfilePicture);
router.get('/patient/getProfileImage/:id',getProfileImage);
router.get('/patient/getNotifications/:idNumber',getNotifications);

// Route to handling Admins authentication
router.post('/auth/admin/create', registerAdmins );
router.put('/auth/admin/changeinitialpassword', adminInitialPasswordChange )
router.post('/auth/admin/forgotpassword', adminForgotPassword);
router.post('/auth/admin/changeexpiredpassword', adminChangeExpiredPassword);
router.put('/auth/admin/resetexpiredpassword', adminResetExpiredPassword);
router.post('/auth/admin/resendexpiredpassotp', resendExpiredPasswordOtpAdmin);
router.put('/auth/admin/resetpassword', adminResetPassword);
router.post('/auth/admin/resendpassotp', resendPasswordOtpAdmin );

router.get('/admin/viewadmin/:id', getOneAdmin);
router.get('/admin/viewallAdmins', getAllAdmins);
router.put('/admin/update/:id', updateAdmin);
router.delete('/admin/deletemyaccount/:id', deleteOneAdmin);
router.delete('/admin/deleteaccountbysuperadmin/:id');
router.get('/admin/logs',getLogsForLogins);

// Routes for handling admin profile management
router.get('/admin/viewProfile',ViewAdminProfile );
router.post('/admin/uploadProfileImages',uploadAdminProfileImages );
router.put('/admin/updateProfile',UpdateAdminProfile);
router.patch('/admin/updateProfileImage',updateAdminProfileImage );
router.delete('/admin/deleteProfilePicture',deleteAdminProfilePicture);

//Routes for handling Doctors authentication
router.post('/auth/doctor/register',registerDoctors)
router.post('/auth/doctor/changepassword',doctorInitiallPasswordChange)
router.post('/auth/doctor/forgotpassword',doctorForgotPassword)
router.put('/auth/doctor/resetpassword', doctorResetPassword);
router.post('/auth/doctor/resendotp', doctorResendOtp );
router.post('/auth/doctor/changeexpiredpassword',doctorChangeExpiredPassword)
router.put('/auth/doctor/resetexpiredpassword', doctorResetExpiredPassword);
router.post('/auth/doctor/resendexpiredpassotp', resendExpiredPasswordOtpDoctor);

router.get('/doctor/viewalldoctors', getAllDoctors );
router.get('/doctor/viewallspecialists',getSpecialist)
router.get('/doctor/viewdoctor/:doctorId', getOneDoctor);
router.put('/doctor/updatedetails/:doctorId', updateDoctor);
router.delete('/doctor/deletemyaccount/:id', deleteDoctor);
router.delete('/doctor/deleteaccountbysuperadmin/:id');
router.get('/auth/doctor/getall/generalservicedoctors', getAllGeneralServiceDoctors)

//Routes for handling doctor profile management
router.get('/doctor/getProfileImage/:id',getDoctorProfileImage)
router.get('/doctor/viewProfile',viewDoctorProfile);
//router.post('/doctor/uploadProfileImages',uploadDoctorProfileImage);
router.put('/doctor/updateProfile', UpdateDoctorProfile);
router.patch('/doctor/updateProfileImage',updateDoctorProfileImage);
router.delete('/doctor/deleteProfilePicture',deleteDoctorProfilePicture);

//Routes for handling pharmacist profile management
router.get('/pharmacist/getProfileImage ',getProfileImage);
router.post('/pharmacist/uploadProfileImages',);
router.put('/pharmacist/updateProfile', updatePharmacistProfile);
router.patch('/pharmacist/updateProfileImage',updatePharmacistProfileImage);
router.delete('/pharmacist/deleteProfilePicture',deletePharmacistProfilePicture);

//Routes for handling pharmacist profile management
router.get('/pharmacist/getProfileImage ',getProfileImage);
router.post('/pharmacist/uploadProfileImages',);
router.put('/pharmacist/updateProfile', updatePharmacistProfile);
router.patch('/pharmacist/updateProfileImage',updatePharmacistProfileImage);
router.delete('/pharmacist/deleteProfilePicture',deletePharmacistProfilePicture);


// Routes  for handling Household Member
router.get('/householdMembers',getAllHouseholdsMembers)
router.post('/create/householdmember',createHouseholdMember)
router.get('/householdMember/single/:householdNumber',getHouseholdMembers)

// Routes  for handling Household 
router.get('/viewhouseholds', getAllHouseholds)
router.post('/create/household',createHousehold)
router.get('/household/single/:householdNumber',getOneHousehold)
router.put('/update/household/:householdNumber',updateHousehold)
router.delete('/delete/household/:householdNumber',deleteHousehold)
 
// Route to handling medical reporting form
router.post('/createMedicalReportingForm', createMedicalReportingForm);
router.get('/getAllMedicalReportingForms', getAllMedicalReportingForms);
router.get('/getMedicalReportingFormById/:patientIdNumber', getMedicalReportingFormById);
router.put('/updateMedicalReportingForm/:patientIdNo', updateMedicalReportingFormById);
router.delete('/deleteMedicalReportingForm/:patientIdNo', deleteMedicalReportingFormById);

//Routes for handling appointment booking
router.post('/appointments/bookappointment', createAppointment);
router.get('/appointments/single-patient-appointments/:doctorId',getSinglePatientAppointments);
//router.post('/appointments/approvebookings/:doctorId',approveAppointment)
//approve appointment
router.put('/appointments/approvebookings/:doctorId',approveAppointment)
router.delete('/appointments/deleteallnotifications/:id',deleteAllNotifications)
router.put('/appointments/cancelappointment/:appointmentId',cancelAppointment)
router.get('/appointments/getallappointments', getAllAppointments)
router.get('/appointments/unapprovedbookings/:doctorId',unApprovedBookings)
//get unapproved bookings
router.get('/appointments/allunapprovedbookings',unApprovedBookings)
//get ALL approved appointments
router.get('/appointments/allapprovedbookings',getAllApprovedAppointments)
router.get('/appointments/approvedbookings/:doctorId',approvedBookings)
router.get('/appointments/appointmentStatus/:appointmentId',appointmentStatus);
router.put('/appointments/rescheduleappointment/:appointmentId',rescheduleAppointment);

//Routes for handling notifications
router.get('/notifications/getallnotifications/:idNumber',getAllNotifications)
router.put('/markasread/:id', markAsRead)

// Routes for handling Medical services
router.post('/service/createService', createService);
router.put('/service/updateService/:id', updateService);
router.delete('/service/deleteService/:id', deleteService);
router.get('/service/viewallservices', getAllServices );

// Routes for handlng Child Health Status
router.get('/chp/viewallchildhealthstatusrecord', getAllChildHealthAssessmentRecords),
router.get('/chp/viewchildhealthstatusrecord', getChildHealthAssessmentRecord);
router.post('/chp/addchildhealthstatusrecord', createChildHealthAssessmentRecord);

// Routes for handlng Pregnancy Assessment Records
router.get('/chp/viewallpregnancyassessmentrecords', getAllPregnancyAssessmentRecords),
router.get('/chp/viewpregnancyassessmentrecord', getPregnancyAssessmentRecord);
router.post('/chp/addpregnancyassessmentrecord', createPregnancyAssessmentRecord);


//Routes for handling patient's medical health records
router.post('/createrecord', createRecord)
router.get('/viewlabresults', viewLabResults)
router.get('/downloadlabresults/:id', downloadLabResults)
router.get('/viewhealthrecords', viewHealthRecords)
router.get('/displaypressuremap', displayPressureMap)
router.post('/uploadlabresults', uploadLabResults);
router.post('/healthrecords/addPatientFile/:idNumber',addPatientFile)


// Routes for handling Billing and payments
router.post('/billings/addbillings', addBillingWithServices );
router.get('/billings/getallbillings' , getAllBillings )
router.get('/billings/getpatientbillings/:id', getPatientAllBillings)
router.post('/payments/makestkpayments/:id', makeStkPayment )
router.post('/payments/makecardpayments/:billingId', makeCardPayment )
router.post('/payments/confirm-payments/:billingId', confirmPayments )
router.get('/payments/get-one-patient-payments/:idNumber', getOnePatientPaymentsRecords)


// Routes for adding Teleclinic
router.post('/teleclinic/addteleclinic', addTeleafyaClinic)
router.get('/teleclinic/viewallteleclinics', getAllTeleafyaClinics)
router.put('/teleclinic/updateteleclinic/:id', updateClinic )
router.delete('/teleclinic/deleteteleclinic/:id', deleteClinic )
 
//Routes for handling products
router.post('/product/createproduct', createNewProduct ); 
router.get('/product/viewproduct/:id', getOneProduct );
router.get('/product/viewallproducts', getAllProducts);
router.put('/product/updateproduct/:productId', updateProduct);
router.delete('/product/deleteproduct/:productId', deleteProduct );
router.post('/product/addproductimage/:id', productImageUpload )

//Routes for handling Carts
router.post('/cart/createcart/:idNumber', createNewCart );
router.get('/cart/viewusercart/:id', getUserCart);
router.get('/cart/viewallusercarts', getAllUserCarts );
router.put('/cart/updatecart/:id', updateUserCart );
router.delete('/cart/deletecart', deleteCart)

//Routes for handling Orders
router.post('/order/createorder/:customerId', addOrderWithProducts);
router.get('/order/viewuserorder/:id', getPatientAllOrders );
router.get('/order/viewallorders', getAllOrders );
router.put('/order/cancelorder/:orderId', cancelOrder)
router.put('/order/updateorder/:userId');
router.delete('/order/deleteorder/:userId',  );

// Prescription images
router.post('/prescription/uploadprescriptionimage/:id', prescriptionImageUpload)
router.post('/prescription/approve-prescription/:prescriptionId',approvePrescription)
router.post('/prescription/decline-prescription/:prescriptionId',declinePrescription)
router.get('/prescription/view-all-prescriptions',getAllPrescriptions )


//delivery information
router.post('/delivery/add-delivery-information/:userId',addDeliveryInformation)
//zoom
router.get('/zoom/oath/callback', zoomToken)

// Routes for roles

router.get('/roles/getallroles', getAllRoles)
router.post('/roles/addrole', addRole)
router.put('/roles/updaterole/:code', updateRoles )
router.delete('/roles/deleterole/:code', deleteRoles )


module.exports = router;