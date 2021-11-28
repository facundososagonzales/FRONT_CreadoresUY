import { PaymentInfo } from "./PayMentInfo";

export interface Creator {
    idUser: number;
    category1: string;
    category2: string;
    creatorName: string;
    nickName: string;
    contentDescription: string;
    biography: string;
    youtubeLink: string;
    creatorImage: string;
    coverImage: string;
    paymentInfo: PaymentInfo;
}