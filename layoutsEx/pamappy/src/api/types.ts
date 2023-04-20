
/**
* AUTO_GENERATED Do not change this file directly, use config.ts file instead
*
* @version 5
*/

        
        export interface Appointment {"_id": {[x in string | number ]: any};"anonimize": boolean;"calendarId": string;
/**
 * 
 * - Format: date-time
 */
"date": string;"forUser": string;"name": string;"note": string;"shared": boolean;"title": string;"type": number;"user": string;}
        
        
        export interface ChangePassword {"newPassword": string;"oldPassword": string;}
        
        
        export interface CycleStep {"_id": {[x in string | number ]: any};"cycleNumber": number;
/**
 * 
 * - Format: date-time
 */
"date": string;"note": string;"remainingEggs": number;"stepType": number;"transferedEggs": number;"transfertNumber": number;"user": string;}
        
        
        export interface Doc {"_id": {[x in string | number ]: any};"archived": boolean;"content": string;
/**
 * 
 * - Format: date-time
 */
"date": string;"tag": number;"title": string;"user": string;}
        
        
        export interface FileObject {"_id": ObjectId;"chunkSize": number;"contentType": string;"filename": string;"length": number;"md5": string;"metadata": Metadata;
/**
 * 
 * - Format: date-time
 */
"uploadDate": string;}
        
        
        export interface ItsMeLogin {"code": string;"redirectUri": string;"state": string;}
        
        
        export interface Login {"email": string;"password": string;}
        
        
        export interface MedicalCenter {"_id": {[x in string | number ]: any};"address": string;"emergencyNumber": string;"name": string;"planningNumber": string;"receptionNumber": string;"resultsNumber": string;"user": string;}
        
        
        export interface Medication {"_id": {[x in string | number ]: any};"alarm": {[x in string | number ]: any};"anonimize": boolean;"calendarId": string;"choice": string;"code": string;"dateRange": {[x in string | number ]: any};"note": string;"periodicity": number;"quantity": string;"shared": boolean;"timeOfDay": {[x in string | number ]: any};"title": string;"type": number;"user": string;}
        
        
        export interface Message {"_id": {[x in string | number ]: any};"appointmentStatus": number;"content": string;
/**
 * 
 * - Format: date-time
 */
"date": string;"title": string;"type": number;"user": string;}
        
        
        export interface Metadata {[x in string | number ]: any}
        
        
        export interface Note {"_id": {[x in string | number ]: any};"archived": boolean;"content": string;
/**
 * 
 * - Format: date-time
 */
"date": string;"tag": number;"title": string;"user": string;}
        
        
        export interface ObjectId {[x in string | number ]: any}
        
        
        export interface Picture {"_id": {[x in string | number ]: any};
/**
 * 
 * - Format: date-time
 */
"date": string;"user": string;}
        
        
        export interface Register {"_id": {[x in string | number ]: any};"carrier": boolean;"email": string;"firstName": string;"gender": string;"lastName": string;"medicalCenter": string;"password": string;}
        
        
        export interface Treatment {"_id": {[x in string | number ]: any};"name": string;"user": string;}
        
        
        export interface User {"_id": {[x in string | number ]: any};"birthDate": string;"bloodType": string;
/**
 * 
 * - Format: date-time
 */
"breakfast": string;"calendarId": string;"carrier": boolean;"currentCycle": number;"cycleLength": number;
/**
 * 
 * - Format: date-time
 */
"dinner": string;"email": string;"firstName": string;"gender": string;"isPremium": boolean;"lastName": string;"locale": string;
/**
 * 
 * - Format: date-time
 */
"lunch": string;"medicalCenter": string;
/**
 * 
 * - Format: date-time
 */
"mensesAt": string;"mensesDuration": number;"partner": User;"password": string;"pendingPartenerEmail": string;"picture": string;"resetToken": number;"shareAppointments": boolean;"shareDocuments": boolean;"shareMedications": boolean;"shareNotes": boolean;"sharePhotos": boolean;"size": number;
/**
 * 
 * - Format: date-time
 */
"subscriptionExpirationDate": string;"subscriptionFromPartner": boolean;"subscriptionType": string;"weight": number;}
        