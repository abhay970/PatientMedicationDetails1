import { LightningElement, api, track } from 'lwc';

export default class RibbonSearchChild extends LightningElement {
    @api item = {};

    @track showProviderSearchResultCardDB = false;
    @track PernalDetail = false;
    @track specialties = false;
    @track insurancesDetails = false;
    @track locationDetails = false;
    @track educationDetails = false;

    @track specialtiesPage = 1;
    @track insurancesPage = 1;
    @track locationPage = 1;
    @track educationPage = 1;

    handleShow() {
        this.showProviderSearchResultCardDB = !this.showProviderSearchResultCardDB;
    }

    handleShowOn() {
        this.PernalDetail = !this.PernalDetail;
    }

    handleShowTw() {
        this.specialties = !this.specialties;
    }

    handleShowThr() {
        this.insurancesDetails = !this.insurancesDetails;
    }

    handleShowFo() {
        this.locationDetails = !this.locationDetails;
    }

    handleShowFi() {
        this.educationDetails = !this.educationDetails;
    }

    get totalSpecialtiesPages() {
        return Math.max(1, Math.min(10, Math.ceil((this.item.specialties_bd || []).length / 3)));
    }

    get totalInsurancesPages() {
        return Math.max(1, Math.min(10, Math.ceil((this.item.insurances_bd || []).length / 3)));
    }

    get totalLocationPages() {
        return Math.max(1, Math.min(10, Math.ceil((this.item.locations || []).length / 3)));
    }

    get totalEducationPages() {
        return Math.max(1, Math.min(10, Math.ceil((this.item.educationDetails || []).length / 3)));
    }

    get currentSpecialties() {
        return this.paginate(this.item.specialties_bd || [], this.specialtiesPage, 3);
    }

    nextPageSpecialties() {
        if (this.specialtiesPage < this.totalSpecialtiesPages) {
            this.specialtiesPage++;
        }
    }

    prevPageSpecialties() {
        if (this.specialtiesPage > 1) {
            this.specialtiesPage--;
        }
    }

    get isFirstPageSpecialties() {
        return this.specialtiesPage === 1;
    }

    get isLastPageSpecialties() {
        return this.specialtiesPage >= this.totalSpecialtiesPages;
    }

    get currentInsurances() {
        return this.paginate(this.item.insurances_bd || [], this.insurancesPage, 3);
    }

    nextPageInsurances() {
        if (this.insurancesPage < this.totalInsurancesPages) {
            this.insurancesPage++;
        }
    }

    prevPageInsurances() {
        if (this.insurancesPage > 1) {
            this.insurancesPage--;
        }
    }

    get isFirstPageInsurances() {
        return this.insurancesPage === 1;
    }

    get isLastPageInsurances() {
        return this.insurancesPage >= this.totalInsurancesPages;
    }

    get currentLocations() {
        return this.paginate(this.item.locations_bd || [], this.locationPage, 3);
    }

    nextPageLocations() {
        if (this.locationPage < this.totalLocationPages) {
            this.locationPage++;
        }
    }

    prevPageLocations() {
        if (this.locationPage > 1) {
            this.locationPage--;
        }
    }

    get isFirstPageLocations() {
        return this.locationPage === 1;
    }

    get isLastPageLocations() {
        return this.locationPage >= this.totalLocationPages;
    }

    get currentEducation() {
        return this.paginate(this.item.educationDetails || [], this.educationPage, 3);
    }

    nextPageEducation() {
        if (this.educationPage < this.totalEducationPages) {
            this.educationPage++;
        }
    }

    prevPageEducation() {
        if (this.educationPage > 1) {
            this.educationPage--;
        }
    }

    get isFirstPageEducation() {
        return this.educationPage === 1;
    }

    get isLastPageEducation() {
        return this.educationPage >= this.totalEducationPages;
    }

    paginate(items, page, pageSize) {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return items.slice(start, end);
    }
}
