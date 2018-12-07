import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HelpTicket } from '../resources/data/help-ticket-object';

@inject(Router, HelpTicket)
export class HelpTickets {
    constructor(router, helpTickets) {
        this.router = router;
        this.helpTickets = helpTickets;
        this.message = 'Help Tickets';
        this.showHelpTicketEditForm = false;
        this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    }
    
    async activate() {
        await this.helpTickets.getHelpTickets(this.userObj);
    }

    attached() {
        feather.replace();
    }

    async getHelpTickets() {
        await this.helpTickets.getHelpTickets();
    }

    newHelpTicket() {
        this.helpTicket = {
            title: "",
            personId: this.userObj._id,
            ownerId: "a1a1a1a1a1a1a1a1a1a1a1a1",
            status: 'new'
        };
        this.helpTicketContent = {
            personId: this.userObj._id,
            content: ""
        };
        this.showEditForm();
    }

    async editHelpTicket(helpTicket) {
        this.helpTicket = helpTicket;
        this.helpTicketContent = {
            personId: this.userObj._id,
            content: ""
        };
        await this.helpTickets.getHelpTicketsContents(helpTicket._id)
        this.showEditForm();
    }

    showEditForm() {
        this.showHelpTicketEditForm = true;
        setTimeout(() => { $("#title").focus(); }, 500);
    }

    changeActive(helpTicket) {
        this.helpTicket = helpTicket;
        this.save();
    }

    async save() {
        if (this.helpTicket && this.helpTicket.title && this.helpTicketContent && this.helpTicketContent.content) {
            if (this.userObj.role !== 'user') {
                this.helpTicket.ownerId = this.userObj._id;
            }
            let helpTicket = { helpTicket: this.helpTicket, content: this.helpTicketContent };
            await this.helpTickets.saveHelpTicket(helpTicket);
            await this.getHelpTickets();
            this.back();
        }
    }

    async delete() {
        if (this.helpTicket) {
            await this.helpTickets.delete(this.helpTicket);
            await this.getHelpTickets();
            this.back();
        }
    }

    back() {
        this.showHelpTicketEditForm = false;
        this.showHelpTicketDisplayForm = false;
        this.filesToUpload = new Array();
        this.files = new Array();
    }

    logout() {
        this.router.navigate('home');
      }

}


