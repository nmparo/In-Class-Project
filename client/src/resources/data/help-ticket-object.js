import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';

@inject(DataServices)

export class HelpTicket {

    constructor(data) {
        this.data = data;
        this.HELP_TICKET_SERVICE = 'helpTickets';
        this.HELP_TICKETCONTENT_SERVICE = 'helpTicketContent'; 
    }
    
    async getHelpTickets(userObj) {
        let url = this.HELP_TICKET_SERVICE;
        if (userObj.role == 'user') {
            url += '/user/' + userObj._id;
        }
        let response = await this.data.get(url);
        if (!response.error) {
            this.helpTicketsArray = response;
        } else {
            this.helpTicketsArray = [];
        }
    }

    async getHelpTicketContent(helpTicketId) {
        let url = this.HELP_TICKETCONTENT_SERVICE + '/helpTicket/' + helpTicketId;
        let response = await this.data.get(url);
        console.log(helpTicketId);
        if (!response.error) {
            this.helpTicketContentArray = response;
        } else {
            this.helpTicketContentArray = [];
        }     
    }

    async saveHelpTicket(helpTicket) {
        let serverResponse;
        if (helpTicket) {
            if (helpTicket.helpTicket._id) {
                serverResponse = await this.data.put(helpTicket, this.HELP_TICKET_SERVICE);
            } else {
                serverResponse = await this.data.post(helpTicket, this.HELP_TICKET_SERVICE);
            }
            return serverResponse;
        }
    }

    async deleteHelpTicket(helpTicket) {
        if (helpTicket && helpTicket._id) {
            await this.data.delete(this.HELP_TICKET_SERVICE + '/' + helpTicket._id);
            console.log(helpTicket._id);
        }
    }   

async uploadFile(files, id) {
	await this.data.uploadFiles(files, this.HELP_TICKET_CONTENT_SERVICE + "/upload/" + id );
}


}