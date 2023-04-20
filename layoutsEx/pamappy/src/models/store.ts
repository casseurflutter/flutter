import { atom, useRecoilState, useRecoilValue } from "recoil";

export type SignupValue = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
export const signUpAtom = atom<SignupValue | undefined>({
  key: "testAtom", // unique ID (with respect to other atoms/selectors)
  default: undefined,
});

export const useCurrentSignUpState = () => useRecoilState(signUpAtom);
export const useCurrentSignUpValue = () => useRecoilValue(signUpAtom);
