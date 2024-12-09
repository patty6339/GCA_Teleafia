const swagger={
    /**
 * @swagger
 * components:
 *   schemas:
 *     Household:
 *       type: object 
 *       required:
 *         -householdNumber
 *         -nationality   
 *         -county
 *         -subCounty
 *         -constituency
 *         -ward
 *         -communityUnit
 *         -householdSize
 *         -numberOfUnderFive
 *         -householdIncomeLevel
 *         -householdAnnualIncome
 *         -householdPrimarySourceOfIncome
 *         -typeOfResidence
 *         -typeOfResidenceOwnership
 *         -householdAmmenities
 *         -sourceOfDrinkingWater
 *         -reliabilityOfWaterSupply
 *         -treatingConsumptionWater
 *         -waterTreatmentMethods
 *         -typeOfSanitationFacility
 *         -shareOfSanitationFacility
 *         -cleaningFrequencyOfSanitationFacility
 *         -accessibilityOfHandwashingFacility
 *         -householdMembersHandwashingFrequency
 *         -householdMembersWithIllnessSymptoms
 *         -illnessTypesOfHouseholdMembers
 *         -householdMembersTreatmentRequirement
 *         -typeOfTreatmentSought
 *         -householdMemberCurrentlySick
 *         -soughtMedicalAttention
 *         -memberMedicalFacilityReferralConsent
 *         -householdIllnessPreventiveMeasures
 *         -barriersToAccessingHealthcareServices
 *         -frequencyOfPreventiveHealthCareActivities
 *         -factorsHinderingPreventiveHealthCareActivities
 *         -regularPhysicalActivityEngagement
 *         -fruitsAndVegetablesConsumptionsPerDay
 *         -tobaccoAndNicotineUsage
 *         -alcoholConsumptions
 *         -routineImmunizationsUpToDate
 *         -lastMedicalCheckupHistory
 *         -cancerScreenings
 *         -healthInformationAndAwareness
 *       properties:
 *         householdNumber:
 *           type: integer
 *           description: The household registration number
 *         nationality:
 *           type: string
 *           description: The nationality of the household head
 *         county:
 *           type: string
 *           description: The county the household is located 
 *         subCounty:
 *           type: string
 *           description: The subcounty the household is located 
 *         constituency:
 *           type: string
 *           description: The constituency the household is located 
 *         ward:
 *           type: string
 *           description: The ward the household is located 
 *         communityUnit:
 *           type: string
 *           description: The communityUnit the household is located
 *         householdSize:
 *           type: integer
 *           description: The number of household members
 *         numberOfUnderFive:
 *           type: integer
 *           description: Number of household members under five years
 *         householdIncomeLevel:
 *           type: string
 *           description: The level of income of the household
 *         householdAnnualIncome:
 *           type: string
 *           description: Annual income of the household
 *         householdPrimarySourceOfIncome:
 *           type: string
 *           description: Primary source of income of the household
 *         typeOfResidence:
 *           type: string
 *           description: Type of residence of the household
 *         typeOfResidenceOwnership:
 *           type: string
 *           description: Type of residence owned to the household
 *         householdAmmenities:
 *           type: string
 *           description: Type of amenities owned by the household
 *         sourceOfDrinkingWater:
 *            type: string
 *            description: Source of drinking water for the household
 *         reliabilityOfWaterSupply:
 *            type: string
 *            description: Reliability of water supply for the household
 *         treatingConsumptionWater:
 *            type: string
 *            description: Whether drinking water is being treated
 *         waterTreatmentMethods:
 *            type: string
 *            description: Water tratment methods used by household
 *         typeOfSanitationFacility:
 *            type: string
 *            description: Type of sanitation facility owned by household
 *         shareOfSanitationFacility:
 *            type: string
 *            description: Establishing whether sanitation facility is shared among households
 *         cleaningFrequencyOfSanitationFacility:
 *            type: string
 *            description: Frequency of cleaning sanitation facility by household
 *         accessibilityOfHandwashingFacility:
 *            type: string
 *            description: Accessibility Of handwashing facility by household
 *         householdMembersHandwashingFrequency:
 *            type: string
 *            description: Frequency by which household members wash their hands
 *         householdMembersWithIllnessSymptoms:
 *            type: string
 *            description: A list of household members with illness symptoms
 *         illnessTypesOfHouseholdMembers:
 *            type: string
 *            description: TYpes of illnesses household members suffer from
 *         householdMembersTreatmentRequirement:
 *            type: string
 *            description: Types of treatment household members require
 *         typeOfTreatmentSought:
 *            type: string
 *            description: TYpes of treatment household members sought
 *         householdMemberCurrentlySick:
 *            type: string
 *            description: List of household members who are currently sick
 *         soughtMedicalAttention:
 *            type: string
 *            description: Whether sick household members sought for medical attention
 *         memberMedicalFacilityReferralConsent:
 *            type: string
 *            description: Whether sick household members are willing to be referred to a medical facility
 *         householdIllnessPreventiveMeasures:
 *            type: string
 *            description: Illness preventive measures practised by the household members
 *         barriersToAccessingHealthcareServices:
 *            type: string
 *            description: Barriers to accessing healthcare services by household members
 *         frequencyOfPreventiveHealthCareActivities:
 *            type: string
 *            description: Frequency of preventive healthcare  activities by household members
 *         factorsHinderingPreventiveHealthCareActivities:
 *            type: string
 *            description: Factors hindering preventive healthcare activities
 *         regularPhysicalActivityEngagement:
 *            type: string
 *            description: Whether household members engage in regular physical activities
 *         fruitsAndVegetablesConsumptionsPerDay:
 *            type: string
 *            description: Amount of fruits and vegetables consumed by household members per day
 *         tobaccoAndNicotineUsage:
 *            type: string
 *            description: Whether household members use tobacco and nicotine 
 *         alcoholConsumptions:
 *            type: string
 *            description: Whether household members take alcohol
 *         routineImmunizationsUpToDate:
 *            type: string
 *            description: Whether household members routine immunization is ut to date
 *         lastMedicalCheckupHistory:
 *            type: string
 *            description: Last medical checkup history of household members
 *         cancerScreenings:
 *            type: string
 *            description: Cancer screenings done on household members
 *         healthInformationAndAwareness:
 *            type: string
 *            description: Whether household members have been educated on health issues
 */


//Creating a household

/**
 * @swagger
 * tags:
 *     name: Household
 *     description: The Household registration schema
 * paths:
 *   /api/create/household:
 *     post:
 *       summary: Household registration endpoint
 *       tags: [Household]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Household'
 *       responses:
 *         '200':
 *           description: Household successfully registered
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Household'
 *         '500':
 *           description: Server error
 */


//Get a list of all registered households

/**
 * @swagger
 * tags:
 *   - name: Household
 *     description: The household registration schema
 * /api/households:
 *   get:
 *     summary: Get a list of registered households endpoit
 *     tags: 
 *       - Household
 *     responses:
 *       200:
 *         description: List of households
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Household'
 */ 


//Get a single household by household number

/**
 * @swagger
 * tags:
 *   - name: Household
 *     description: The household registration schema
 * /api/household/single/householdNumber:
 *   get:
 *     summary: Get a single household endpoint
 *     tags: 
 *       - Household
 *     parameters:
 *       - in: path
 *         name: householdNumber
 *         schema:
 *              type: string
 *         required: true
 *         description: The household number
 *     responses:
 *       200:
 *         description: Get a single household by household number
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Household'
 *       404:
 *         description: The household is not found
 */ 


//Update a household

/**
 * @swagger
 * tags:
 *   - name: Household
 *     description: The household registration schema
 * /api/update/household/householdNumber:
 *   put:
 *     summary: Update household endpoint
 *     tags: 
 *       - Household
 *     parameters:
 *       - in: path
 *         name: householdNumber
 *         schema:
 *              type: string
 *         required: true
 *         description: The household number
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Household'
 *     responses:
 *       200:
 *         description: Update a household number
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Household'
 *       404:
 *         description: The household is not found
 *       500:
 *         description: Some error occurred
 */


//Delete a household

/**
 * @swagger
 * tags:
 *   - name: Household
 *     description: Delete household
 * /api/delete/household/householdNumber:
 *   delete:
 *     summary: Delete household endpoint
 *     tags: 
 *       - Household
 *     parameters:
 *       - in: path
 *         name: householdNumber
 *         schema:
 *              type: string
 *         required: true
 *         description: The household number
*/

//handle appointments

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: API endpoints for appointment management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AppointmentBooking:
 *       type: object
 *       properties:
 *         appointmentId:
 *           type: string
 *           description: The ID of the appointment
 *         bookFor:
 *           type: string
 *           description: The entity for which the appointment is booked (e.g., 'patient' or 'doctor')
 *         service:
 *           type: string
 *           description: The service for which the appointment is booked
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the appointment
 *         time:
 *           type: string
 *           format: time
 *           description: The time of the appointment
 *         appointmentType:
 *           type: string
 *           description: The type of appointment (e.g., 'consultation', 'checkup')
 *         fullName:
 *           type: string
 *           description: The full name of the patient (if applicable)
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the patient
 *         idNumber:
 *           type: string
 *           description: The ID number of the patient
 *         gender:
 *           type: string
 *           description: The gender of the patient
 *         age:
 *           type: integer
 *           description: The age of the patient
 *         status:
 *           type: string
 *           description: The status of the appointment (e.g., 'pending', 'approved')
 */

/**
 * @swagger
 * /api/appointments/bookappointment:
 *   post:
 *     summary: Book a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentBooking'
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/appointments/appointment-history/{idNumber}:
 *   get:
 *     summary: Get appointment history for a patient
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: idNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID number of the patient
 *     responses:
 *       200:
 *         description: Successfully retrieved appointment history
 *       404:
 *         description: Patient not found
 */

/**
 * @swagger
 * /api/appointments/approvebookings/{doctorId}:
 *   post:
 *     summary: Approve pending appointments for a doctor
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the doctor
 *     responses:
 *       200:
 *         description: Appointments approved successfully
 *       404:
 *         description: Doctor not found or no pending appointments to approve
 */

/**
 * @swagger
 * /api/appointments/cancelappointment/{appointmentId}:
 *   put:
 *     summary: Cancel an existing appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment to cancel
 *     responses:
 *       200:
 *         description: Appointment canceled successfully
 *       404:
 *         description: Appointment not found
 */

/**
 * @swagger
 * /api/appointments/getallappointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: Successfully retrieved all appointments
 *       404:
 *         description: No appointments found
 */

/**
 * @swagger
 * /api/appointments/unapprovedbookings/{doctorId}:
 *   get:
 *     summary: Get unapproved appointments for a doctor
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the doctor
 *     responses:
 *       200:
 *         description: Successfully retrieved unapproved appointments
 *       404:
 *         description: Doctor not found or no unapproved appointments
 */

/**
 * @swagger
 * /api/appointments/approvedbookings/{doctorId}:
 *   get:
 *     summary: Get approved appointments for a doctor
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the doctor
 *     responses:
 *       200:
 *         description: Successfully retrieved approved appointments
 *       404:
 *         description: Doctor not found or no approved appointments
 */

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API endpoints for managing user carts
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           description: The name of the user associated with the cart
 *         userId:
 *           type: string
 *           description: The ID of the user associated with the cart
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product in the cart
 */

/**
 * @swagger
 * /api/cart/createcart/{idNumber}:
 *   post:
 *     summary: Create a new cart for a user
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: idNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID number of the user
 *     responses:
 *       200:
 *         description: Cart created successfully
 *       400:
 *         description: Bad request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 */

/**
 * @swagger
 * /api/cart/viewusercart/{id}:
 *   get:
 *     summary: View a user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved user's cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found
 */

/**
 * @swagger
 * /api/cart/viewallusercarts:
 *   get:
 *     summary: View all user carts
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Successfully retrieved all user carts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 *       404:
 *         description: No carts found
 */

/**
 * @swagger
 * /api/cart/updatecart/{id}:
 *   put:
 *     summary: Update a user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       404:
 *         description: Cart not found
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 */

/**
 * @swagger
 * /api/cart/deletecart:
 *   delete:
 *     summary: Delete a user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cart to delete
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *       404:
 *         description: Cart not found
 */

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: API endpoints for managing orders
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         orderId:
 *           type: string
 *           description: The ID of the order
 *         customerName:
 *           type: string
 *           description: The name of the customer
 *         customerId:
 *           type: string
 *           description: The ID of the customer
 *         customerEmail:
 *           type: string
 *           description: The email of the customer
 *         customerPhoneNumber:
 *           type: string
 *           description: The phone number of the customer
 *         amountBilled:
 *           type: integer
 *           description: The total amount billed for the order
 *         payBill:
 *           type: integer
 *           description: The amount paid by the customer
 *         accNo:
 *           type: integer
 *           description: The account number for payment
 *         paymentStatus:
 *           type: string
 *           enum: [Pending, Paid]
 *           default: Pending
 *           description: The payment status of the order
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product in the order
 *       required:
 *         - orderId
 *         - customerName
 *         - customerId
 *         - customerEmail
 *         - customerPhoneNumber
 *         - amountBilled
 */

/**
 * @swagger
 * /api/order/createorder:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/order/viewuserorder/{id}:
 *   get:
 *     summary: View all orders for a user
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the customer
 *     responses:
 *       200:
 *         description: Successfully retrieved user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: Orders not found
 */

/**
 * @swagger
 * /api/order/viewallorders:
 *   get:
 *     summary: View all orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Successfully retrieved all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: No orders found
 */

/**
 * @swagger
 * /api/order/updateorder/{userId}:
 *   put:
 *     summary: Update an order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /api/order/deleteorder/{userId}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the customer
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: Description of the product
 *         category:
 *           type: string
 *           description: The category of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *       required:
 *         - productId
 *         - name
 *         - description
 *         - category
 *         - price
 */

/**
 * @swagger
 * /api/product/createproduct:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/product/viewproduct/{id}:
 *   get:
 *     summary: View a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: Successfully retrieved product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/product/viewallproducts:
 *   get:
 *     summary: View all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Successfully retrieved all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No products found
 */

/**
 * @swagger
 * /api/product/updateproduct/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/product/deleteproduct/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */

}

module.exports=swagger