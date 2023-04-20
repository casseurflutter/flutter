
/**
* AUTO_GENERATED Do not change this file directly, use config.ts file instead
*
* @version 5
*/

import { useMemo } from "react";
import { AxiosRequestConfig } from "axios";
import {
  UseQueryOptions,
  useQuery,
  useMutation,
  UseMutationOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  QueryClient,
} from "react-query";
import { RequestError, SwaggerResponse } from "./config";
import { paginationFlattenData, getPageSize, getTotal } from "./hooksConfig";

const useHasMore = (
  pages: Array<SwaggerResponse<any>> | undefined,
  list: any,
  queryParams: any,
) =>
  useMemo(() => {
    if (!pages || (pages && pages.length < 1)) {
      return false;
    }

    const total = getTotal(pages);

    if (total !== undefined) {
      if (list && list.length < total) {
        return true;
      }
      return false;
    }
    if (
      paginationFlattenData([pages[pages.length - 1]])?.length === getPageSize(queryParams as any)
    ) {
      return true;
    }

    return false;
  }, [pages, list, queryParams]);

import { Appointment, ChangePassword, CycleStep, Doc, FileObject, ItsMeLogin, Login, MedicalCenter, Medication, Message, Note, Picture, Register, Treatment, User,}  from "./types"
import { deleteAppointmentsId, deleteCyclesStepIdDelete, deleteDocsId, deleteMedicationsId, deleteMessagesId, deleteNotesId, deletePicturesId, getAppointmentsAll, getAppointmentsId, getAttachmentFilesDeleteId, getAttachmentFilesId, getAttachmentFilesInfoId, getCyclesAll, getCyclesNumberAll, getCyclesStepId, getDocsAll, getDocsId, getMedicalCentersAll, getMedicationsAll, getMedicationsId, getMessagesAll, getMessagesId, getNotesAll, getNotesId, getPicturesAll, getPicturesId, getTreatmentsAll, getUsersMe, getUsersPendingInvitation, postAppointments, postAttachmentFiles, postAuthDeleteAccount, postAuthItsmeAuthenticate, postAuthLogin, postAuthRegister, postCyclesCreate, postCyclesStepCreate, postDocs, postMedicalCenters, postMedications, postMessages, postNotes, postPictures, postTreatments, postUsersChangePassword, postUsersForgotPassword, postUsersInvitePartner, postUsersJoinPartner, postUsersResetPartner, postUsersResetPassword, postUsersSendAccountData, postUsersUpdateSubsription, putAppointmentsId, putCyclesStepIdEdit, putDocsId, putMedicationsId, putMessagesId, putNotesId, putPicturesId, putUsersEdit,}  from "./services"

      export const useDeleteAppointmentsId =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<Appointment>, RequestError | Error,{id: string, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<Appointment>, RequestError | Error, {id: string, _extraVariables?: TExtra }>((
             { id,
          
          
          }
          )=>deleteAppointmentsId(
             id,
          
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const useDeleteCyclesStepIdDelete =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<number>, RequestError | Error,{id: string, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<number>, RequestError | Error, {id: string, _extraVariables?: TExtra }>((
             { id,
          
          
          }
          )=>deleteCyclesStepIdDelete(
             id,
          
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const useDeleteDocsId =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<Doc>, RequestError | Error,{id: string, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<Doc>, RequestError | Error, {id: string, _extraVariables?: TExtra }>((
             { id,
          
          
          }
          )=>deleteDocsId(
             id,
          
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const useDeleteMedicationsId =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<Medication>, RequestError | Error,{id: string, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<Medication>, RequestError | Error, {id: string, _extraVariables?: TExtra }>((
             { id,
          
          
          }
          )=>deleteMedicationsId(
             id,
          
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const useDeleteMessagesId =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<Message>, RequestError | Error,{id: string, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<Message>, RequestError | Error, {id: string, _extraVariables?: TExtra }>((
             { id,
          
          
          }
          )=>deleteMessagesId(
             id,
          
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const useDeleteNotesId =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<Note>, RequestError | Error,{id: string, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<Note>, RequestError | Error, {id: string, _extraVariables?: TExtra }>((
             { id,
          
          
          }
          )=>deleteNotesId(
             id,
          
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const useDeletePicturesId =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<Picture>, RequestError | Error,{id: string, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<Picture>, RequestError | Error, {id: string, _extraVariables?: TExtra }>((
             { id,
          
          
          }
          )=>deletePicturesId(
             id,
          
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const useGetAppointmentsAll = (
           options?:UseQueryOptions<SwaggerResponse<Appointment[]>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetAppointmentsAll.info( 
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<Appointment[]>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetAppointmentsAll.info = (options?:UseQueryOptions<SwaggerResponse<Appointment[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getAppointmentsAll.key,
            
            
            ],
                fun: () =>
                getAppointmentsAll(
                   
          
          
          
                  configOverride
                ),
              };
            };useGetAppointmentsAll.prefetch = (
            client: QueryClient,
            options?:UseQueryOptions<SwaggerResponse<Appointment[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetAppointmentsAll.info( 
          
          
           options,configOverride);

                return client.getQueryData([getAppointmentsAll.key,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetAppointmentsId = (
           id: string,options?:UseQueryOptions<SwaggerResponse<Appointment>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetAppointmentsId.info( id,
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<Appointment>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetAppointmentsId.info = (id: string,options?:UseQueryOptions<SwaggerResponse<Appointment>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getAppointmentsId.key,id,
            
            
            ],
                fun: () =>
                getAppointmentsId(
                   id,
          
          
          
                  configOverride
                ),
              };
            };useGetAppointmentsId.prefetch = (
            client: QueryClient,
            id: string,options?:UseQueryOptions<SwaggerResponse<Appointment>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetAppointmentsId.info( id,
          
          
           options,configOverride);

                return client.getQueryData([getAppointmentsId.key,id,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetAttachmentFilesDeleteId = (
           id: string,options?:UseQueryOptions<SwaggerResponse<FileObject>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetAttachmentFilesDeleteId.info( id,
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<FileObject>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetAttachmentFilesDeleteId.info = (id: string,options?:UseQueryOptions<SwaggerResponse<FileObject>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getAttachmentFilesDeleteId.key,id,
            
            
            ],
                fun: () =>
                getAttachmentFilesDeleteId(
                   id,
          
          
          
                  configOverride
                ),
              };
            };useGetAttachmentFilesDeleteId.prefetch = (
            client: QueryClient,
            id: string,options?:UseQueryOptions<SwaggerResponse<FileObject>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetAttachmentFilesDeleteId.info( id,
          
          
           options,configOverride);

                return client.getQueryData([getAttachmentFilesDeleteId.key,id,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetAttachmentFilesId = (
           id: string,options?:UseQueryOptions<SwaggerResponse<{[x in string | number ]: any}>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetAttachmentFilesId.info( id,
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<{[x in string | number ]: any}>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetAttachmentFilesId.info = (id: string,options?:UseQueryOptions<SwaggerResponse<{[x in string | number ]: any}>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getAttachmentFilesId.key,id,
            
            
            ],
                fun: () =>
                getAttachmentFilesId(
                   id,
          
          
          
                  configOverride
                ),
              };
            };useGetAttachmentFilesId.prefetch = (
            client: QueryClient,
            id: string,options?:UseQueryOptions<SwaggerResponse<{[x in string | number ]: any}>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetAttachmentFilesId.info( id,
          
          
           options,configOverride);

                return client.getQueryData([getAttachmentFilesId.key,id,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetAttachmentFilesInfoId = (
           id: string,options?:UseQueryOptions<SwaggerResponse<FileObject>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetAttachmentFilesInfoId.info( id,
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<FileObject>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetAttachmentFilesInfoId.info = (id: string,options?:UseQueryOptions<SwaggerResponse<FileObject>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getAttachmentFilesInfoId.key,id,
            
            
            ],
                fun: () =>
                getAttachmentFilesInfoId(
                   id,
          
          
          
                  configOverride
                ),
              };
            };useGetAttachmentFilesInfoId.prefetch = (
            client: QueryClient,
            id: string,options?:UseQueryOptions<SwaggerResponse<FileObject>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetAttachmentFilesInfoId.info( id,
          
          
           options,configOverride);

                return client.getQueryData([getAttachmentFilesInfoId.key,id,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetCyclesAll = (
           options?:UseQueryOptions<SwaggerResponse<CycleStep[]>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetCyclesAll.info( 
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<CycleStep[]>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetCyclesAll.info = (options?:UseQueryOptions<SwaggerResponse<CycleStep[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getCyclesAll.key,
            
            
            ],
                fun: () =>
                getCyclesAll(
                   
          
          
          
                  configOverride
                ),
              };
            };useGetCyclesAll.prefetch = (
            client: QueryClient,
            options?:UseQueryOptions<SwaggerResponse<CycleStep[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetCyclesAll.info( 
          
          
           options,configOverride);

                return client.getQueryData([getCyclesAll.key,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetCyclesNumberAll = (
           number: number,options?:UseQueryOptions<SwaggerResponse<CycleStep[]>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetCyclesNumberAll.info( number,
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<CycleStep[]>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetCyclesNumberAll.info = (number: number,options?:UseQueryOptions<SwaggerResponse<CycleStep[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getCyclesNumberAll.key,number,
            
            
            ],
                fun: () =>
                getCyclesNumberAll(
                   number,
          
          
          
                  configOverride
                ),
              };
            };useGetCyclesNumberAll.prefetch = (
            client: QueryClient,
            number: number,options?:UseQueryOptions<SwaggerResponse<CycleStep[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetCyclesNumberAll.info( number,
          
          
           options,configOverride);

                return client.getQueryData([getCyclesNumberAll.key,number,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetCyclesStepId = (
           id: string,options?:UseQueryOptions<SwaggerResponse<CycleStep>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetCyclesStepId.info( id,
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<CycleStep>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetCyclesStepId.info = (id: string,options?:UseQueryOptions<SwaggerResponse<CycleStep>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getCyclesStepId.key,id,
            
            
            ],
                fun: () =>
                getCyclesStepId(
                   id,
          
          
          
                  configOverride
                ),
              };
            };useGetCyclesStepId.prefetch = (
            client: QueryClient,
            id: string,options?:UseQueryOptions<SwaggerResponse<CycleStep>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetCyclesStepId.info( id,
          
          
           options,configOverride);

                return client.getQueryData([getCyclesStepId.key,id,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetDocsAll = (
           options?:UseQueryOptions<SwaggerResponse<Doc[]>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetDocsAll.info( 
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<Doc[]>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetDocsAll.info = (options?:UseQueryOptions<SwaggerResponse<Doc[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getDocsAll.key,
            
            
            ],
                fun: () =>
                getDocsAll(
                   
          
          
          
                  configOverride
                ),
              };
            };useGetDocsAll.prefetch = (
            client: QueryClient,
            options?:UseQueryOptions<SwaggerResponse<Doc[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetDocsAll.info( 
          
          
           options,configOverride);

                return client.getQueryData([getDocsAll.key,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetDocsId = (
           id: string,options?:UseQueryOptions<SwaggerResponse<Doc>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetDocsId.info( id,
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<Doc>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetDocsId.info = (id: string,options?:UseQueryOptions<SwaggerResponse<Doc>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getDocsId.key,id,
            
            
            ],
                fun: () =>
                getDocsId(
                   id,
          
          
          
                  configOverride
                ),
              };
            };useGetDocsId.prefetch = (
            client: QueryClient,
            id: string,options?:UseQueryOptions<SwaggerResponse<Doc>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetDocsId.info( id,
          
          
           options,configOverride);

                return client.getQueryData([getDocsId.key,id,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetMedicalCentersAll = (
           options?:UseQueryOptions<SwaggerResponse<MedicalCenter[]>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetMedicalCentersAll.info( 
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<MedicalCenter[]>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetMedicalCentersAll.info = (options?:UseQueryOptions<SwaggerResponse<MedicalCenter[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getMedicalCentersAll.key,
            
            
            ],
                fun: () =>
                getMedicalCentersAll(
                   
          
          
          
                  configOverride
                ),
              };
            };useGetMedicalCentersAll.prefetch = (
            client: QueryClient,
            options?:UseQueryOptions<SwaggerResponse<MedicalCenter[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetMedicalCentersAll.info( 
          
          
           options,configOverride);

                return client.getQueryData([getMedicalCentersAll.key,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetMedicationsAll = (
           options?:UseQueryOptions<SwaggerResponse<Medication[]>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetMedicationsAll.info( 
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<Medication[]>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetMedicationsAll.info = (options?:UseQueryOptions<SwaggerResponse<Medication[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getMedicationsAll.key,
            
            
            ],
                fun: () =>
                getMedicationsAll(
                   
          
          
          
                  configOverride
                ),
              };
            };useGetMedicationsAll.prefetch = (
            client: QueryClient,
            options?:UseQueryOptions<SwaggerResponse<Medication[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetMedicationsAll.info( 
          
          
           options,configOverride);

                return client.getQueryData([getMedicationsAll.key,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetMedicationsId = (
           id: string,options?:UseQueryOptions<SwaggerResponse<Medication>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetMedicationsId.info( id,
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<Medication>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetMedicationsId.info = (id: string,options?:UseQueryOptions<SwaggerResponse<Medication>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getMedicationsId.key,id,
            
            
            ],
                fun: () =>
                getMedicationsId(
                   id,
          
          
          
                  configOverride
                ),
              };
            };useGetMedicationsId.prefetch = (
            client: QueryClient,
            id: string,options?:UseQueryOptions<SwaggerResponse<Medication>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetMedicationsId.info( id,
          
          
           options,configOverride);

                return client.getQueryData([getMedicationsId.key,id,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetMessagesAll = (
           options?:UseQueryOptions<SwaggerResponse<Message[]>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetMessagesAll.info( 
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<Message[]>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetMessagesAll.info = (options?:UseQueryOptions<SwaggerResponse<Message[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getMessagesAll.key,
            
            
            ],
                fun: () =>
                getMessagesAll(
                   
          
          
          
                  configOverride
                ),
              };
            };useGetMessagesAll.prefetch = (
            client: QueryClient,
            options?:UseQueryOptions<SwaggerResponse<Message[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetMessagesAll.info( 
          
          
           options,configOverride);

                return client.getQueryData([getMessagesAll.key,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetMessagesId = (
           id: string,options?:UseQueryOptions<SwaggerResponse<Message>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetMessagesId.info( id,
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<Message>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetMessagesId.info = (id: string,options?:UseQueryOptions<SwaggerResponse<Message>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getMessagesId.key,id,
            
            
            ],
                fun: () =>
                getMessagesId(
                   id,
          
          
          
                  configOverride
                ),
              };
            };useGetMessagesId.prefetch = (
            client: QueryClient,
            id: string,options?:UseQueryOptions<SwaggerResponse<Message>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetMessagesId.info( id,
          
          
           options,configOverride);

                return client.getQueryData([getMessagesId.key,id,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetNotesAll = (
           options?:UseQueryOptions<SwaggerResponse<Note[]>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetNotesAll.info( 
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<Note[]>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetNotesAll.info = (options?:UseQueryOptions<SwaggerResponse<Note[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getNotesAll.key,
            
            
            ],
                fun: () =>
                getNotesAll(
                   
          
          
          
                  configOverride
                ),
              };
            };useGetNotesAll.prefetch = (
            client: QueryClient,
            options?:UseQueryOptions<SwaggerResponse<Note[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetNotesAll.info( 
          
          
           options,configOverride);

                return client.getQueryData([getNotesAll.key,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetNotesId = (
           id: string,options?:UseQueryOptions<SwaggerResponse<Note>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetNotesId.info( id,
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<Note>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetNotesId.info = (id: string,options?:UseQueryOptions<SwaggerResponse<Note>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getNotesId.key,id,
            
            
            ],
                fun: () =>
                getNotesId(
                   id,
          
          
          
                  configOverride
                ),
              };
            };useGetNotesId.prefetch = (
            client: QueryClient,
            id: string,options?:UseQueryOptions<SwaggerResponse<Note>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetNotesId.info( id,
          
          
           options,configOverride);

                return client.getQueryData([getNotesId.key,id,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetPicturesAll = (
           options?:UseQueryOptions<SwaggerResponse<Picture[]>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetPicturesAll.info( 
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<Picture[]>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetPicturesAll.info = (options?:UseQueryOptions<SwaggerResponse<Picture[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getPicturesAll.key,
            
            
            ],
                fun: () =>
                getPicturesAll(
                   
          
          
          
                  configOverride
                ),
              };
            };useGetPicturesAll.prefetch = (
            client: QueryClient,
            options?:UseQueryOptions<SwaggerResponse<Picture[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetPicturesAll.info( 
          
          
           options,configOverride);

                return client.getQueryData([getPicturesAll.key,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetPicturesId = (
           id: string,options?:UseQueryOptions<SwaggerResponse<Picture>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetPicturesId.info( id,
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<Picture>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetPicturesId.info = (id: string,options?:UseQueryOptions<SwaggerResponse<Picture>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getPicturesId.key,id,
            
            
            ],
                fun: () =>
                getPicturesId(
                   id,
          
          
          
                  configOverride
                ),
              };
            };useGetPicturesId.prefetch = (
            client: QueryClient,
            id: string,options?:UseQueryOptions<SwaggerResponse<Picture>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetPicturesId.info( id,
          
          
           options,configOverride);

                return client.getQueryData([getPicturesId.key,id,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetTreatmentsAll = (
           options?:UseQueryOptions<SwaggerResponse<Treatment[]>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetTreatmentsAll.info( 
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<Treatment[]>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetTreatmentsAll.info = (options?:UseQueryOptions<SwaggerResponse<Treatment[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getTreatmentsAll.key,
            
            
            ],
                fun: () =>
                getTreatmentsAll(
                   
          
          
          
                  configOverride
                ),
              };
            };useGetTreatmentsAll.prefetch = (
            client: QueryClient,
            options?:UseQueryOptions<SwaggerResponse<Treatment[]>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetTreatmentsAll.info( 
          
          
           options,configOverride);

                return client.getQueryData([getTreatmentsAll.key,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetUsersMe = (
           options?:UseQueryOptions<SwaggerResponse<User>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetUsersMe.info( 
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<User>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetUsersMe.info = (options?:UseQueryOptions<SwaggerResponse<User>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getUsersMe.key,
            
            
            ],
                fun: () =>
                getUsersMe(
                   
          
          
          
                  configOverride
                ),
              };
            };useGetUsersMe.prefetch = (
            client: QueryClient,
            options?:UseQueryOptions<SwaggerResponse<User>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetUsersMe.info( 
          
          
           options,configOverride);

                return client.getQueryData([getUsersMe.key,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const useGetUsersPendingInvitation = (
           options?:UseQueryOptions<SwaggerResponse<User>, RequestError | Error>,configOverride?:AxiosRequestConfig
           ) => {
          const { key, fun } = useGetUsersPendingInvitation.info( 
          
          
           options,configOverride);
          return useQuery<SwaggerResponse<User>, RequestError | Error>(key,()=>
                fun(),
                options
               )  
          }
        useGetUsersPendingInvitation.info = (options?:UseQueryOptions<SwaggerResponse<User>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
              return {
                key: [getUsersPendingInvitation.key,
            
            
            ],
                fun: () =>
                getUsersPendingInvitation(
                   
          
          
          
                  configOverride
                ),
              };
            };useGetUsersPendingInvitation.prefetch = (
            client: QueryClient,
            options?:UseQueryOptions<SwaggerResponse<User>, RequestError | Error>,configOverride?:AxiosRequestConfig) => {
                const { key, fun } = useGetUsersPendingInvitation.info( 
          
          
           options,configOverride);

                return client.getQueryData([getUsersPendingInvitation.key,
            
            
            ])
                ? Promise.resolve()
                : client.prefetchQuery(
                    key,
                    ()=>fun(),
                    options
                  );
              }
      export const usePostAppointments =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: Appointment, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: Appointment, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postAppointments(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostAttachmentFiles =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: {
/**
 * 
 * - Format: binary
 */
"file"?: string;}, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: {
/**
 * 
 * - Format: binary
 */
"file"?: string;}, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postAttachmentFiles(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostAuthDeleteAccount =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{_extraVariables?:TExtra} | void>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {_extraVariables?:TExtra} | void>((
             
          )=>postAuthDeleteAccount(
             
          
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostAuthItsmeAuthenticate =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: ItsMeLogin, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: ItsMeLogin, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postAuthItsmeAuthenticate(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostAuthLogin =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: Login, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: Login, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postAuthLogin(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostAuthRegister =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: Register, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: Register, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postAuthRegister(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostCyclesCreate =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{_extraVariables?:TExtra} | void>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {_extraVariables?:TExtra} | void>((
             
          )=>postCyclesCreate(
             
          
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostCyclesStepCreate =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: CycleStep, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: CycleStep, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postCyclesStepCreate(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostDocs =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: Doc, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: Doc, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postDocs(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostMedicalCenters =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: MedicalCenter, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: MedicalCenter, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postMedicalCenters(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostMedications =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: Medication, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: Medication, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postMedications(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostMessages =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: Message, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: Message, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postMessages(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostNotes =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: Note, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: Note, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postNotes(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostPictures =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: Picture, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: Picture, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postPictures(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostTreatments =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: Treatment, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: Treatment, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postTreatments(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostUsersChangePassword =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: ChangePassword, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: ChangePassword, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postUsersChangePassword(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostUsersForgotPassword =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: {"email"?: string;}, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: {"email"?: string;}, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postUsersForgotPassword(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostUsersInvitePartner =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: {"email"?: string;}, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: {"email"?: string;}, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postUsersInvitePartner(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostUsersJoinPartner =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: {"carrierId"?: string;}, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: {"carrierId"?: string;}, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postUsersJoinPartner(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostUsersResetPartner =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{_extraVariables?:TExtra} | void>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {_extraVariables?:TExtra} | void>((
             
          )=>postUsersResetPartner(
             
          
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostUsersResetPassword =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: {"confirmPassword"?: string;"password"?: string;"token"?: number;}, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: {"confirmPassword"?: string;"password"?: string;"token"?: number;}, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postUsersResetPassword(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostUsersSendAccountData =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{_extraVariables?:TExtra} | void>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {_extraVariables?:TExtra} | void>((
             
          )=>postUsersSendAccountData(
             
          
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePostUsersUpdateSubsription =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<any>, RequestError | Error,{requestBody: {"expirationDate"?: undefined;"isActive"?: boolean;"subscriptionType"?: string;}, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<any>, RequestError | Error, {requestBody: {"expirationDate"?: undefined;"isActive"?: boolean;"subscriptionType"?: string;}, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>postUsersUpdateSubsription(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePutAppointmentsId =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<Appointment>, RequestError | Error,{id: string,requestBody: Appointment, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<Appointment>, RequestError | Error, {id: string,requestBody: Appointment, _extraVariables?: TExtra }>((
             { id,
          requestBody,
          
          }
          )=>putAppointmentsId(
             id,
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePutCyclesStepIdEdit =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<CycleStep>, RequestError | Error,{id: string,requestBody: CycleStep, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<CycleStep>, RequestError | Error, {id: string,requestBody: CycleStep, _extraVariables?: TExtra }>((
             { id,
          requestBody,
          
          }
          )=>putCyclesStepIdEdit(
             id,
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePutDocsId =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<Doc>, RequestError | Error,{id: string,requestBody: Doc, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<Doc>, RequestError | Error, {id: string,requestBody: Doc, _extraVariables?: TExtra }>((
             { id,
          requestBody,
          
          }
          )=>putDocsId(
             id,
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePutMedicationsId =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<Medication>, RequestError | Error,{id: string,requestBody: Medication, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<Medication>, RequestError | Error, {id: string,requestBody: Medication, _extraVariables?: TExtra }>((
             { id,
          requestBody,
          
          }
          )=>putMedicationsId(
             id,
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePutMessagesId =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<Message>, RequestError | Error,{id: string,requestBody: Message, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<Message>, RequestError | Error, {id: string,requestBody: Message, _extraVariables?: TExtra }>((
             { id,
          requestBody,
          
          }
          )=>putMessagesId(
             id,
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePutNotesId =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<Note>, RequestError | Error,{id: string,requestBody: Note, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<Note>, RequestError | Error, {id: string,requestBody: Note, _extraVariables?: TExtra }>((
             { id,
          requestBody,
          
          }
          )=>putNotesId(
             id,
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePutPicturesId =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<Picture>, RequestError | Error,{id: string,requestBody: Picture, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<Picture>, RequestError | Error, {id: string,requestBody: Picture, _extraVariables?: TExtra }>((
             { id,
          requestBody,
          
          }
          )=>putPicturesId(
             id,
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        
      export const usePutUsersEdit =<TExtra> (
           options?:UseMutationOptions<SwaggerResponse<User>, RequestError | Error,{requestBody: User, _extraVariables?:TExtra}>,configOverride?:AxiosRequestConfig
           ) => {return useMutation<SwaggerResponse<User>, RequestError | Error, {requestBody: User, _extraVariables?: TExtra }>((
             { 
          requestBody,
          
          }
          )=>putUsersEdit(
             
          requestBody,
          
          
            configOverride,
          ),
          options
         )  
          }
        