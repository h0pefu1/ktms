export interface AuthResponse{
    accessToken:string;
    refreshToken:string;
    user:IUser
}
export interface IRole{
    id?:number,
    name?:string,
    permission?:number
}
export interface IPerson{
    id?:number,
    firstName?:string,
    lastName?:string,
}

export interface IUser{
    id?:number,
    username:string,
    role?:IRole,
    person?: IPerson,
    isAuth?:boolean,
    mongoDbParticipantId?:string,
}
export type IUserForMeeeting={
    person?:IPerson,
    id?:number,

}

export type Meeting = {
    name:string,
    teams?:Team[],
    dateStart:Date,
    dateEnd:Date,
    additionalUsers?:IUserForMeeeting[],
}

export type MeetingCreate = {
    name:string,
    dateStart:Date,
    dateEnd:Date,
    additionalUsers?: number[], 
    teams?: number[], 
}
export type Team={
    name:string,
}

export type UserAdditional={
    id:number,
    firstName:string,
    lastName:string,
    email?:String,
    phoneNumber?:string,
    birthDay?:Date,
    about:string,
}

export type MeetingType={
    name:string,

}


export type Dashboard={
    persons:IPerson[]
}

export type DropDownItem={
    value:number,
    label:string,
}

export type Chat={
    _id:string,
    name:string,
}


export type NotificationBadges={
    chatBadgeCount?:number,    
    notificationBadgeCount?:number,
}   