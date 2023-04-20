import { FileSystemUploadType } from "expo-file-system";
import * as FileSystem from "expo-file-system";
import { manipulateAsync } from "expo-image-manipulator";
import { useCallback } from "react";
import { Platform } from "react-native";

import { BASE_URL, LOCAL_STORAGE_KEY } from "../api/config";
import { loadString } from "../utils/storage";

export function useUpload() {
  const upload = useCallback(async (file: string) => {
    let accessToken = await loadString(LOCAL_STORAGE_KEY);

    const { uri } = await manipulateAsync(file, [
      {
        resize:
          Platform.OS == "android"
            ? {
                width: 700,
              }
            : {
                width: 500,
              },
      },
    ]);
    let headers: any = {
      contentType: "multipart/form-data",
      authorization: `Bearer ${accessToken}`,
    };
    let { body } = await FileSystem.uploadAsync(
      `${BASE_URL}/attachment/files`,
      uri,
      {
        headers: headers,
        uploadType: FileSystemUploadType.MULTIPART,
        fieldName: "file",
        mimeType: "image/jpeg",
      }
    );
    const parsed = JSON.parse(body);

    // return only the first attachment since we are not doing multiple upload at once
    if (parsed.length > 0) {
      return parsed[0];
    }
    return null;
  }, []);

  return { upload };
}
