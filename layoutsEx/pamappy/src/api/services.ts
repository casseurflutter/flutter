
/**
* AUTO_GENERATED Do not change this file directly, use config.ts file instead
*
* @version 5
*/

import { AxiosRequestConfig } from "axios";
import { SwaggerResponse } from "./config";
import { Http } from "./httpRequest";
import { User, ChangePassword, Login, Register, ItsMeLogin, CycleStep, Note, Doc, Picture, MedicalCenter, Medication, Appointment, Message, Treatment, FileObject,}  from "./types"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const __DEV__ = process.env.NODE_ENV !== "production";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function overrideConfig(
  config?: AxiosRequestConfig,
  configOverride?: AxiosRequestConfig,
): AxiosRequestConfig {
  return {
    ...config,
    ...configOverride,
    headers: {
      ...config?.headers,
      ...configOverride?.headers,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function template(path: string, obj: { [x: string]: any } = {}) {
    Object.keys(obj).forEach((key) => {
      const re = new RegExp(`{${key}}`, "i");
      path = path.replace(re, obj[key]);
    });

    return path;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function objToForm(requestBody: object) {
  const formData = new FormData();

  Object.entries(requestBody).forEach(([key, value]) => {
    value && formData.append(key, value);
  });

  return formData;
}

export const deleteAppointmentsId = (
    id: string,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Appointment>> => {
  
  return Http.deleteRequest(
    template(deleteAppointmentsId.key,{id,}),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
deleteAppointmentsId.key = "/appointments/{id}";

export const deleteCyclesStepIdDelete = (
    id: string,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<number>> => {
  
  return Http.deleteRequest(
    template(deleteCyclesStepIdDelete.key,{id,}),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
deleteCyclesStepIdDelete.key = "/cycles/step/{id}/delete";

export const deleteDocsId = (
    id: string,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Doc>> => {
  
  return Http.deleteRequest(
    template(deleteDocsId.key,{id,}),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
deleteDocsId.key = "/docs/{id}";

export const deleteMedicationsId = (
    id: string,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Medication>> => {
  
  return Http.deleteRequest(
    template(deleteMedicationsId.key,{id,}),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
deleteMedicationsId.key = "/medications/{id}";

export const deleteMessagesId = (
    id: string,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Message>> => {
  
  return Http.deleteRequest(
    template(deleteMessagesId.key,{id,}),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
deleteMessagesId.key = "/messages/{id}";

export const deleteNotesId = (
    id: string,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Note>> => {
  
  return Http.deleteRequest(
    template(deleteNotesId.key,{id,}),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
deleteNotesId.key = "/notes/{id}";

export const deletePicturesId = (
    id: string,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Picture>> => {
  
  return Http.deleteRequest(
    template(deletePicturesId.key,{id,}),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
deletePicturesId.key = "/pictures/{id}";

export const getAppointmentsAll = (
    configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Appointment[]>> => {
  
  return Http.getRequest(
    getAppointmentsAll.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getAppointmentsAll.key = "/appointments/all";

export const getAppointmentsId = (
    id: string,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Appointment>> => {
  
  return Http.getRequest(
    template(getAppointmentsId.key,{id,}),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getAppointmentsId.key = "/appointments/{id}";

export const getAttachmentFilesDeleteId = (
    id: string,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<FileObject>> => {
  
  return Http.getRequest(
    template(getAttachmentFilesDeleteId.key,{id,}),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getAttachmentFilesDeleteId.key = "/attachment/files/delete/{id}";

export const getAttachmentFilesId = (
    id: string,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<{[x in string | number ]: any}>> => {
  
  return Http.getRequest(
    template(getAttachmentFilesId.key,{id,}),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getAttachmentFilesId.key = "/attachment/files/{id}";

export const getAttachmentFilesInfoId = (
    id: string,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<FileObject>> => {
  
  return Http.getRequest(
    template(getAttachmentFilesInfoId.key,{id,}),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getAttachmentFilesInfoId.key = "/attachment/files/info/{id}";

export const getCyclesAll = (
    configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<CycleStep[]>> => {
  
  return Http.getRequest(
    getCyclesAll.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getCyclesAll.key = "/cycles/all";

export const getCyclesNumberAll = (
    number: number,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<CycleStep[]>> => {
  
  return Http.getRequest(
    template(getCyclesNumberAll.key,{number,}),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getCyclesNumberAll.key = "/cycles/{number}/all";

export const getCyclesStepId = (
    id: string,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<CycleStep>> => {
  
  return Http.getRequest(
    template(getCyclesStepId.key,{id,}),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getCyclesStepId.key = "/cycles/step/{id}";

export const getDocsAll = (
    configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Doc[]>> => {
  
  return Http.getRequest(
    getDocsAll.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getDocsAll.key = "/docs/all";

export const getDocsId = (
    id: string,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Doc>> => {
  
  return Http.getRequest(
    template(getDocsId.key,{id,}),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getDocsId.key = "/docs/{id}";

export const getMedicalCentersAll = (
    configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<MedicalCenter[]>> => {
  
  return Http.getRequest(
    getMedicalCentersAll.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getMedicalCentersAll.key = "/medicalCenters/all";

export const getMedicationsAll = (
    configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Medication[]>> => {
  
  return Http.getRequest(
    getMedicationsAll.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getMedicationsAll.key = "/medications/all";

export const getMedicationsId = (
    id: string,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Medication>> => {
  
  return Http.getRequest(
    template(getMedicationsId.key,{id,}),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getMedicationsId.key = "/medications/{id}";

export const getMessagesAll = (
    configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Message[]>> => {
  
  return Http.getRequest(
    getMessagesAll.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getMessagesAll.key = "/messages/all";

export const getMessagesId = (
    id: string,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Message>> => {
  
  return Http.getRequest(
    template(getMessagesId.key,{id,}),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getMessagesId.key = "/messages/{id}";

export const getNotesAll = (
    configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Note[]>> => {
  
  return Http.getRequest(
    getNotesAll.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getNotesAll.key = "/notes/all";

export const getNotesId = (
    id: string,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Note>> => {
  
  return Http.getRequest(
    template(getNotesId.key,{id,}),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getNotesId.key = "/notes/{id}";

export const getPicturesAll = (
    configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Picture[]>> => {
  
  return Http.getRequest(
    getPicturesAll.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getPicturesAll.key = "/pictures/all";

export const getPicturesId = (
    id: string,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Picture>> => {
  
  return Http.getRequest(
    template(getPicturesId.key,{id,}),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getPicturesId.key = "/pictures/{id}";

export const getTreatmentsAll = (
    configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Treatment[]>> => {
  
  return Http.getRequest(
    getTreatmentsAll.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getTreatmentsAll.key = "/treatments/all";

export const getUsersMe = (
    configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<User>> => {
  
  return Http.getRequest(
    getUsersMe.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getUsersMe.key = "/users/me";

export const getUsersPendingInvitation = (
    configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<User>> => {
  
  return Http.getRequest(
    getUsersPendingInvitation.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
getUsersPendingInvitation.key = "/users/pendingInvitation";

export const postAppointments = (
    requestBody: Appointment,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postAppointments.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postAppointments.key = "/appointments";

export const postAttachmentFiles = (
    requestBody: {
/**
 * 
 * - Format: binary
 */
"file"?: string;},configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postAttachmentFiles.key,
    undefined,
    objToForm(requestBody),
    undefined,
    overrideConfig(_CONSTANT1,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postAttachmentFiles.key = "/attachment/files";

export const postAuthDeleteAccount = (
    configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postAuthDeleteAccount.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postAuthDeleteAccount.key = "/auth/deleteAccount";

export const postAuthItsmeAuthenticate = (
    requestBody: ItsMeLogin,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postAuthItsmeAuthenticate.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postAuthItsmeAuthenticate.key = "/auth/itsme/authenticate";

export const postAuthLogin = (
    requestBody: Login,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postAuthLogin.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postAuthLogin.key = "/auth/login";

export const postAuthRegister = (
    requestBody: Register,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postAuthRegister.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postAuthRegister.key = "/auth/register";

export const postCyclesCreate = (
    configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postCyclesCreate.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postCyclesCreate.key = "/cycles/create";

export const postCyclesStepCreate = (
    requestBody: CycleStep,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postCyclesStepCreate.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postCyclesStepCreate.key = "/cycles/step/create";

export const postDocs = (
    requestBody: Doc,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postDocs.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postDocs.key = "/docs";

export const postMedicalCenters = (
    requestBody: MedicalCenter,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postMedicalCenters.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postMedicalCenters.key = "/medicalCenters";

export const postMedications = (
    requestBody: Medication,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postMedications.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postMedications.key = "/medications";

export const postMessages = (
    requestBody: Message,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postMessages.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postMessages.key = "/messages";

export const postNotes = (
    requestBody: Note,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postNotes.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postNotes.key = "/notes";

export const postPictures = (
    requestBody: Picture,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postPictures.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postPictures.key = "/pictures";

export const postTreatments = (
    requestBody: Treatment,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postTreatments.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postTreatments.key = "/treatments";

export const postUsersChangePassword = (
    requestBody: ChangePassword,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postUsersChangePassword.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postUsersChangePassword.key = "/users/changePassword";

export const postUsersForgotPassword = (
    requestBody: {"email"?: string;},configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postUsersForgotPassword.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postUsersForgotPassword.key = "/users/forgotPassword";

export const postUsersInvitePartner = (
    requestBody: {"email"?: string;},configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postUsersInvitePartner.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postUsersInvitePartner.key = "/users/invitePartner";

export const postUsersJoinPartner = (
    requestBody: {"carrierId"?: string;},configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postUsersJoinPartner.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postUsersJoinPartner.key = "/users/joinPartner";

export const postUsersResetPartner = (
    configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postUsersResetPartner.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postUsersResetPartner.key = "/users/resetPartner";

export const postUsersResetPassword = (
    requestBody: {"confirmPassword"?: string;"password"?: string;"token"?: number;},configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postUsersResetPassword.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postUsersResetPassword.key = "/users/resetPassword";

export const postUsersSendAccountData = (
    configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postUsersSendAccountData.key,
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postUsersSendAccountData.key = "/users/sendAccountData";

export const postUsersUpdateSubsription = (
    requestBody: {"expirationDate"?: undefined;"isActive"?: boolean;"subscriptionType"?: string;},configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  
  return Http.postRequest(
    postUsersUpdateSubsription.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
postUsersUpdateSubsription.key = "/users/updateSubsription";

export const putAppointmentsId = (
    id: string,requestBody: Appointment,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Appointment>> => {
  
  return Http.putRequest(
    template(putAppointmentsId.key,{id,}),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
putAppointmentsId.key = "/appointments/{id}";

export const putCyclesStepIdEdit = (
    id: string,requestBody: CycleStep,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<CycleStep>> => {
  
  return Http.putRequest(
    template(putCyclesStepIdEdit.key,{id,}),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
putCyclesStepIdEdit.key = "/cycles/step/{id}/edit";

export const putDocsId = (
    id: string,requestBody: Doc,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Doc>> => {
  
  return Http.putRequest(
    template(putDocsId.key,{id,}),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
putDocsId.key = "/docs/{id}";

export const putMedicationsId = (
    id: string,requestBody: Medication,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Medication>> => {
  
  return Http.putRequest(
    template(putMedicationsId.key,{id,}),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
putMedicationsId.key = "/medications/{id}";

export const putMessagesId = (
    id: string,requestBody: Message,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Message>> => {
  
  return Http.putRequest(
    template(putMessagesId.key,{id,}),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
putMessagesId.key = "/messages/{id}";

export const putNotesId = (
    id: string,requestBody: Note,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Note>> => {
  
  return Http.putRequest(
    template(putNotesId.key,{id,}),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
putNotesId.key = "/notes/{id}";

export const putPicturesId = (
    id: string,requestBody: Picture,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<Picture>> => {
  
  return Http.putRequest(
    template(putPicturesId.key,{id,}),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
putPicturesId.key = "/pictures/{id}";

export const putUsersEdit = (
    requestBody: User,configOverride?:AxiosRequestConfig
): Promise<SwaggerResponse<User>> => {
  
  return Http.putRequest(
    putUsersEdit.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0,
      configOverride,
    )
  )
}

/** Key is end point string without base url */
putUsersEdit.key = "/users/edit";
export const _CONSTANT0 = {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            };export const _CONSTANT1 = {
              headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
              },
            };