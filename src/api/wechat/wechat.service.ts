import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class WeChatService {
  public readonly appId: string = 'wxbc7c29be77d22f20';
  public readonly appSecret: string = 'a95a3b55264e1eb9219fe0e418006f9b';
  private accessToken: string = null;
  private accessTokenExpiresAt: number = 0;
  private jsapiTicket: string = null;
  private jsapiTicketExpiresAt: number = 0;

  private async fetchAccessToken(): Promise<string> {
    try {
      const response = await axios.get(
        `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appId}&secret=${this.appSecret}`,
      );
      this.accessToken = response.data.access_token;
      this.accessTokenExpiresAt = Date.now() + response.data.expires_in * 1000;
      return this.accessToken;
    } catch (error) {
      throw new HttpException('Failed to get access token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async fetchJsApiTicket(accessToken: string): Promise<string> {
    try {
      const response = await axios.get(
        `https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=${accessToken}`,
      );
      this.jsapiTicket = response.data.ticket;
      this.jsapiTicketExpiresAt = Date.now() + response.data.expires_in * 1000;
      return this.jsapiTicket;
    } catch (error) {
      throw new HttpException('Failed to get jsapi ticket', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAccessToken(): Promise<string> {
    if (!this.accessToken || Date.now() > this.accessTokenExpiresAt) {
      return this.fetchAccessToken();
    }
    return this.accessToken;
  }

  async getJsApiTicket(): Promise<string> {
    const accessToken = await this.getAccessToken();
    if (!this.jsapiTicket || Date.now() > this.jsapiTicketExpiresAt) {
      return this.fetchJsApiTicket(accessToken);
    }
    return this.jsapiTicket;
  }

  generateSignature(jsapiTicket: string, url: string): { nonceStr: string; timestamp: number; signature: string } {
    const nonceStr = Math.random().toString(36).substr(2, 15);
    const timestamp = Math.floor(Date.now() / 1000);
    const rawString = `jsapi_ticket=${jsapiTicket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
    const signature = crypto.createHash('sha1').update(rawString).digest('hex');
    return {
      nonceStr,
      timestamp,
      signature,
    };
  }

  async getWeChatConfig(url: string) {
    const jsapiTicket = await this.getJsApiTicket();
    return this.generateSignature(jsapiTicket, url);
  }
}
