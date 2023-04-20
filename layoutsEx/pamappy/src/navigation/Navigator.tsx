import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CommonActions, NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import * as Device from "expo-device";
import * as NavigationBar from "expo-navigation-bar";
import { Box, Text } from "pearl-ui";
import React, { FC, useEffect, useRef, useState } from "react";
import { Trans } from "react-i18next";
import { ColorSchemeName, Image, Platform, View } from "react-native";
import OneSignal from "react-native-onesignal";

import { BusyIndicator } from "~components";
import {
  AddMedicationScreen,
  AppointmentsScreen,
  BloodGroupScreen,
  CyclesScreen,
  ForgotPasswordScreen,
  HomeScreen,
  LogInScreen,
  MedicalCentersScreen,
  MedicationScreen,
  MyInformationsScreen,
  MyMealsScreen,
  MyMedicalCenterScreen,
  MyProfileScreen,
  NoteScreen,
  NotesScreen,
  PhotosScreen,
  SettingsScreen,
  ShareOptionsScreen,
  ShareWithPartnerScreen,
  SignUpScreen,
  SignUpStep2Screen,
  SignUpStep3Screen,
} from "~screens";

import { useGetUsersMe } from "../api/hooks";
import { useAuth } from "../hooks/useAuth";
import { FONTS } from "../hooks/useFonts";
import { AddAppointementsScreen } from "../screens/AddAppointements";
import { AddMedicalCenterScreen } from "../screens/AddMedicalCenter";
import { EditCycleScreen } from "../screens/Cycle/EditCycle";
import { EditStepScreen } from "../screens/Cycle/EditStep";
import { DeleteMyAccountScreen } from "../screens/DeleteMyAccount";
import { EggsRemaining } from "../screens/EggsRemaining";
import { ChoiceMedicationScreen } from "../screens/Medication/ChoiceMedication";
import { DateMedicationScreen } from "../screens/Medication/DateMedication";
import { DosageScreen } from "../screens/Medication/Dosage";
import { TypeMedicationScreen } from "../screens/Medication/TypeMedication";
import { MessageDetailsScreen } from "../screens/MessageDetails";
import { MessagesScreen } from "../screens/Messages";
import { ResetPasswordScreen } from "../screens/ResetPassword";
import { ShareScreen } from "../screens/Share";
import { TypesAppointementScreen } from "../screens/TypesAppointement";
import { UpgradeToPremium } from "../screens/UpgradeToPremium";
import { UpgradeToPremium2 } from "../screens/upgradeToPremium2";
import LinkingConfiguration from "./LinkingConfiguration";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const navigationRef = useRef();
  const routeNameRef = useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={LinkingConfiguration}
      // onReady={() =>
      //   (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      // }
      // onStateChange={async () => {
      //   const previousRouteName = routeNameRef.current;
      //   const currentRouteName = navigationRef.current.getCurrentRoute().name;
      //   if (previousRouteName !== currentRouteName) {
      //     await Analytics.logEvent("screen_view", {
      //       screen_name: currentRouteName,
      //     });
      //   }
      //   routeNameRef.current = currentRouteName;
      // }}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

export type NavigatorParamList = {
  loading: undefined;
  signUp: undefined;
  signUpStep2: undefined;
  signUpStep3: undefined;
  signUpStep4: undefined;
  AddMedicalCenter: undefined;

  logIn: undefined;
  forgot: undefined;
  home: undefined;
  updateToPremium: undefined;
  updateToPremium2: undefined;
  eggsRemaining: { cycle: number };
  notes: undefined;
  photos: undefined;
  note: { id: string } | undefined;
  messages: undefined;
  cycles: undefined;
  dosages:
    | { isEditable: boolean; timeOfDay: string; quantity: string; type: string }
    | undefined;
  appointements: undefined;
  editCycle: { cycle: number };
  editStep: { cycle: number; stepType: number; id: string };
  settings: undefined;
  myProfile: undefined;
  myInformations: undefined;
  bloodGroup: undefined;
  dateMedication:
    | {
        isEditable: boolean;
        startDate: string;
        endDate: string;
        periodicity: string;
      }
    | undefined;
  myMedicalCenter: undefined;
  medications: undefined;
  addMedication: { id?: string } | undefined;
  medicalCenters: undefined;
  myMeals: undefined;
  shareOptions: undefined;
  share: undefined;
  shareWithPartner: undefined;
  deleteMyAccount: undefined;
  resetPassword: undefined;
  addAppointements: { id?: string } | undefined;
  typesAppointement: { typeId?: number } | undefined;
  choiceMedication: { id?: number } | undefined;
  typeMedication: { id?: number } | undefined;

  messageDetails: {
    id: string;
  };
};

const headerTitleStyle = {
  fontFamily: FONTS.SF_Pro_Rounded_SemiBold,
  fontWeight: "500",
  fontSize: Platform.select({ android: 14, ios: 16 }),
};

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerStyle: { backgroundColor: "#2FB0ED" },
  headerBackTitle: "",
  animationTypeForReplace: "pop",
  headerTitleStyle,
  headerTitleAlign: "center",
  headerTintColor: "white",
  headerBackTitleVisible: false,
  headerShadowVisible: false,
};

export const LoadingScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "loading">
> = ({ navigation }) => {
  const { initialized, authenticated, logout } = useAuth();

  useEffect(() => {
    if (!initialized) return;
    if (authenticated) {
      if (Platform.OS == "android") {
        NavigationBar.setBackgroundColorAsync("#2FB0ED");
      }
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "main" }],
        })
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "logIn" }],
        })
      );
    }
    return () => {
      //
    };
  }, [authenticated, initialized, navigation]);

  return <BusyIndicator />;
};

export const HOME_TAB = () => {
  const { data, isLoading, refetch } = useGetUsersMe();

  const [isPhone, setIsPhone] = useState(false);
  useEffect(() => {
    Device.getDeviceTypeAsync()
      .then((device) => {
        if (device == Device.DeviceType.PHONE) {
          setIsPhone(true);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  });
  return (
    <Tab.Navigator
      screenOptions={{
        headerTransparent: false,
        headerTintColor: "white",
        tabBarLabelStyle: {
          color: "red",
        },
        headerStyle: { backgroundColor: "#2FB0ED" },
        tabBarActiveTintColor: "#95D1EE",
        tabBarInactiveTintColor: "white",
        headerTitleStyle,
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: "#2FB0ED",
          height: Platform.select({ ios: 80, android: 60 }),
          paddingBottom: Platform.select({ ios: 25, android: 10 }),
        },
      }}
    >
      <Tab.Screen
        name="home"
        options={{
          title: "",

          headerTitle: () => (
            <View pointerEvents="none">
              <Image
                source={require("../assets/home-logo.png")}
                style={{
                  top: 25,
                  height: 220,
                }}
                resizeMode="contain"
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#2FB0ED",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
          tabBarIcon: ({ focused, color }) => (
            <Image
              source={require("../assets/icons/ic_home.png")}
              style={{
                width: 22,
                height: 22,
                tintColor: color,
                marginBottom: -5,
              }}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                marginLeft: isPhone ? 5 : 20,
                marginTop: isPhone ? 0 : 10,
                color,
              }}
              variant="tabLabel"
            >
              <Trans i18nKey={"screen.tabs.home"}>Accueil</Trans>
            </Text>
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="cycles"
        options={{
          headerStyle: {
            backgroundColor: "#2FB0ED",
          },
          headerTintColor: "white",
          headerTransparent: false,
          tabBarIcon: ({ focused, color }) => (
            <Image
              source={require("../assets/icons/ic_cycle.png")}
              resizeMode="contain"
              style={{
                width: 22,
                height: 22,
                tintColor: color,
                marginBottom: -5,
              }}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                marginLeft: isPhone ? 5 : 20,
                marginTop: isPhone ? 0 : 10,
              }}
              variant="tabLabel"
            >
              <Trans i18nKey={"screen.tabs.cycle"} />
            </Text>
          ),
        }}
        component={CyclesScreen}
      />
      <Tab.Screen
        name="appointements"
        options={{
          headerTransparent: false,
          tabBarIcon: ({ focused, color }) => {
            return (
              <Box>
                <Image
                  source={require("../assets/icons/ic_calendar.png")}
                  resizeMode="contain"
                  style={{
                    width: 22,
                    height: 22,
                    tintColor: color,
                    marginBottom: -5,
                  }}
                />
              </Box>
            );
          },
          tabBarLabel: ({ focused, color }) => (
            <Text
              w={100}
              textAlign="center"
              style={{
                color,
                marginLeft: isPhone ? 5 : 20,
                marginTop: isPhone ? 0 : 10,
              }}
              variant="tabLabel"
            >
              <Trans i18nKey={"screen.tabs.appointments"}>Rendez-vous</Trans>
            </Text>
          ),
        }}
        component={AppointmentsScreen}
      />
      <Tab.Screen
        name="photos"
        options={{
          headerTransparent: false,

          tabBarIcon: ({ focused, color }) => {
            return (
              <Box>
                <Image
                  source={require("../assets/icons/ic_photos.png")}
                  resizeMode="contain"
                  style={{ width: 25, height: 25, tintColor: color }}
                />
              </Box>
            );
          },
          tabBarLabel: ({ focused, color }) => {
            return (
              <Text
                style={{
                  marginLeft: isPhone ? 5 : 25,
                  marginTop: isPhone ? 0 : 5,
                  color,
                }}
                variant="tabLabel"
              >
                <Trans i18nKey={"screen.tabs.photos"}>Photos</Trans>
              </Text>
            );
          },
        }}
        component={data?.data?.isPremium ? PhotosScreen : UpgradeToPremium}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          headerTransparent: false,
          tabBarIcon: ({ focused, color }) => (
            <Image
              source={require("../assets/icons/ic_plus.png")}
              resizeMode="contain"
              style={{ width: 25, height: 25, tintColor: color }}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                marginLeft: isPhone ? 5 : 25,
                marginTop: isPhone ? 0 : 5,
              }}
              variant="tabLabel"
            >
              Plus
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const signUpScreens = () => (
  <>
    <Stack.Screen
      name="signUp"
      component={SignUpScreen}
      options={defaultScreenOptions}
    />
    <Stack.Screen
      name="signUpStep2"
      component={SignUpStep2Screen}
      options={defaultScreenOptions}
    />
    <Stack.Screen
      name="signUpStep3"
      component={SignUpStep3Screen}
      options={defaultScreenOptions}
    />
  </>
);

export const RootNavigator = () => {
  useEffect(() => {
    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        console.log(
          "OneSignal: notification will show in foreground:",
          notificationReceivedEvent
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log("notification: ", notification);
        const data = notification.additionalData;
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      }
    );

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler((notification) => {
      console.log("OneSignal: notification opened:", notification);
    });
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="loading"
        component={LoadingScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: "pop",
        }}
      />

      <Stack.Screen
        name="logIn"
        component={LogInScreen}
        options={defaultScreenOptions}
      />
      {signUpScreens()}

      <Stack.Screen
        name="forgot"
        component={ForgotPasswordScreen}
        options={defaultScreenOptions}
      />

      <Stack.Screen
        name="main"
        options={{
          headerShown: false,
        }}
        component={HOME_TAB}
      />

      <Stack.Screen
        name="editCycle"
        component={EditCycleScreen}
        options={defaultScreenOptions}
      />

      <Stack.Screen
        name="editStep"
        component={EditStepScreen}
        options={defaultScreenOptions}
      />

      <Stack.Screen
        options={defaultScreenOptions}
        name="eggsRemaining"
        component={EggsRemaining}
      />
      <Stack.Screen
        name="myProfile"
        component={MyProfileScreen}
        options={defaultScreenOptions}
      />
      <Stack.Screen
        name="myInformations"
        component={MyInformationsScreen}
        options={defaultScreenOptions}
      />
      <Stack.Screen
        options={defaultScreenOptions}
        name="bloodGroup"
        component={BloodGroupScreen}
      />
      <Stack.Screen
        name="myMedicalCenter"
        component={MyMedicalCenterScreen}
        options={defaultScreenOptions}
      />
      <Stack.Screen
        name="AddMedicalCenter"
        component={AddMedicalCenterScreen}
        options={defaultScreenOptions}
      />

      <Stack.Screen
        options={defaultScreenOptions}
        name="medicalCenters"
        component={MedicalCentersScreen}
      />
      <Stack.Screen
        options={defaultScreenOptions}
        name="myMeals"
        component={MyMealsScreen}
      />

      <Stack.Screen
        options={defaultScreenOptions}
        name="notes"
        component={NotesScreen}
      />

      <Stack.Screen
        options={defaultScreenOptions}
        name="note"
        component={NoteScreen}
      />

      <Stack.Screen
        options={defaultScreenOptions}
        name="messages"
        component={MessagesScreen}
      />

      <Stack.Screen
        options={defaultScreenOptions}
        name="shareOptions"
        component={ShareOptionsScreen}
      />
      <Stack.Screen
        options={defaultScreenOptions}
        name="share"
        component={ShareScreen}
      />
      <Stack.Screen
        options={defaultScreenOptions}
        name="shareWithPartner"
        component={ShareWithPartnerScreen}
      />
      <Stack.Screen
        options={defaultScreenOptions}
        name="deleteMyAccount"
        component={DeleteMyAccountScreen}
      />
      <Stack.Screen
        options={defaultScreenOptions}
        name="resetPassword"
        component={ResetPasswordScreen}
      />
      <Stack.Screen
        options={defaultScreenOptions}
        name="addMedication"
        component={AddMedicationScreen}
      />
      <Stack.Screen
        options={defaultScreenOptions}
        name="medications"
        component={MedicationScreen}
      />
      <Stack.Screen
        options={defaultScreenOptions}
        name="updateToPremium"
        component={UpgradeToPremium}
      />
      <Stack.Screen
        options={defaultScreenOptions}
        name="updateToPremium2"
        component={UpgradeToPremium2}
      />
      <Stack.Screen
        options={defaultScreenOptions}
        name="choiceMedication"
        component={ChoiceMedicationScreen}
      />
      <Stack.Screen
        options={defaultScreenOptions}
        name="typeMedication"
        component={TypeMedicationScreen}
      />
      <Stack.Screen
        options={defaultScreenOptions}
        name="dosages"
        component={DosageScreen}
      />

      <Stack.Screen
        options={defaultScreenOptions}
        name="dateMedication"
        component={DateMedicationScreen}
      />
      <Stack.Screen
        options={defaultScreenOptions}
        name="addAppointements"
        component={AddAppointementsScreen}
      />

      <Stack.Screen
        options={defaultScreenOptions}
        name="typesAppointement"
        component={TypesAppointementScreen}
      />
      <Stack.Screen
        options={defaultScreenOptions}
        name="messageDetails"
        component={MessageDetailsScreen}
      />
    </Stack.Navigator>
  );
};
