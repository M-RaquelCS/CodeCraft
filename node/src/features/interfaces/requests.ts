export interface ISubscribeToEvent {
	name: string;
	email: string;
	referrererId?: string | null; // id do usuário que convidou
}

export interface IAccessInviteLink {
	subscriberId: string;
}

export interface IGetSubscriberInviteClicksParams {
	subscriberId: string;
}

export interface IGetSubscriberInvitesCountParams {
	subscriberId: string;
}

export interface IGetSubscriberRankingPositionParams {
	subscriberId: string;
}
