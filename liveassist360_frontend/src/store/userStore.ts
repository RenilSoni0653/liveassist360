import { selectedUserState, userState } from "../lib/types/index";
import { create } from "zustand";

export const useUser = create<userState>((set) => ({
  myUser: undefined,
  setUser: (user) => set({ myUser: user }),
}));

export const useAllUsers = create((set) => ({
  users: undefined,
  setUsers: (users: any) => set({ users }),
}));

export const useSelectedUser = create<selectedUserState>((set) => ({
  selectedUser: undefined,
  setSelectedUser: (user) => set({ selectedUser: user }),
}));

export const useMessages = create((set) => ({
  message: undefined,
  setMessages: (messages: any) => set({ messages }),
}));

export const triggerSocket = create((set) => ({
  roomId: undefined,
  username: undefined,
  userId: undefined,
  setSocket: ({ roomId, username, userId }: any) =>
    set({ roomId, username, userId }),
}));
