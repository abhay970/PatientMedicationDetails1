import { LightningElement, track } from 'lwc';
import getProviderInfo from '@salesforce/apex/RibbonSearchCallout.getProviderInfo';
import getRibbonPicklist from '@salesforce/apex/RibbonSearchCallout.getRibbonPicklist';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RibbonSearch extends LightningElement {
    //  abh start   
    @track carriernameValue=''
    @track stateValue='';
    @track nameplaneValue='';

    @track clinicalareaValue='';
    @track conditionValue='';
    @track treatmentValue='';
    @track NameValue='';
    @track addressValue='';
    @track organizationValue='';
    //  abh end

    searchType;
    searchTypeSelected = true;
    locationSearch = false;
    providerSearch = false;
    @track providerData = [];
    // abh
    locationData=[];
    insuranceData=[];
    clinicalData=[];
    organizationData=[];

    // abh
    @track toggleId;
    toggleRightParent(event) {
        // console.log('open insdex eventfired');
        var targetvalue = event.target.dataset.targetId;
        this.toggleId = targetvalue;
        var elementIndex = event.target.dataset.index;
        console.log(targetvalue+' '+this.toggleId+' '+elementIndex);
        // let childcomponents = this.template.querySelectorAll('c-rfid-comp-child');
        // for (let i = 0; i < childcomponents.length; i++) {
        //     if (i == event.target.dataset.index) {
        //         childcomponents[i].toggleRight(targetvalue);
        //     }
        // }
    }
    showUpAndDown=true;
    handleShow(event)
    {var targetvalue = event.target.dataset.targetId;
        alert(targetvalue);
       this.showUpAndDown=!this.showUpAndDown;
       this.handleShowDetails();
    }
    @track providerDatalocation = [];
    @track displayFields = false;
    @track locationdisplayfields = false;
    @track displayTable = true;
    @track displayTablelocation = true;
    @track selectedSpeciality = '';
    @track npiValue = '';
    @track addressValue = '';
    @track nameValue = '';
    @track countryValue = '';
 
    
    @track locationaddressValue = '';
    @track statelocationValue = '';
    inputDataForApex = {};
    dataForPicklist;
    @track showSpinner = false;


    
    connectedCallback() {
        getRibbonPicklist().then(result => {
            this.dataForPicklist = [...result];
        }).catch(err => {
            console.error('Error fetching picklist data:', err);
        });
    }
    handleNPI(event) {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            this.npiValue = value;
            this.inputDataForApex.Npi = value;
        } else {
            this.showToast('Error', 'NPI must be a number', 'error');
        }
    }

    handleAddress(event) {
        this.addressValue = event.target.value;
        this.inputDataForApex.Address = this.addressValue;
    }

    handleName(event) {
        this.nameValue = event.target.value;
        this.inputDataForApex.Name = this.nameValue;
        console.log('name  ', this.nameValue);
    }
    get options() {
        return [
            { label: 'Provider Search', value: 'ProviderSearch' },
            { label: 'Location Search', value: 'LocationSearch' },
            { label: 'Insurance Search', value: 'InsuranceSearch' },
            { label: 'Clinical Search', value: 'ClinicalSearch' },
            { label: 'Organization Search', value: 'OrganizationSearch' },
           // { label: 'Provider Price Search', value: 'ProviderPriceSearch' }
        ];
    }
    
    // ----------------------
    SpecialityTypeValue = '';
    get SpecialityTypeOptions() {
        return this.dataForPicklist;
    }

    handleChange(event) {
        this.SpecialityTypeValue = event.detail.value;
        this.inputDataForApex.Provider_type =this.SpecialityTypeValue;
        console.log('value=:>',this.SpecialityTypeValue);
    }
    // ----------------------
    handleAddressCountry(event) {
        this.countryValue = event.target.value;
        this.inputDataForApex.Country = this.countryValue;
    }

    handleAddressLocation(event) {
        this.locationaddressValue = event.target.value;
        this.inputDataForApex.Address = this.locationaddressValue;
    }

    handleAddressState(event) {
        this.statelocationValue = event.target.value;
        this.inputDataForApex.State = this.statelocationValue;
    }
    //abhay onchange method start
    handleCarriername(event) {
        this.carriernameValue = event.target.value;
        this.inputDataForApex.Carrier_name = this.carriernameValue;
        console.log('carrierName>>>', this.carriernameValue);
    }
    handleState(event) {
        this.stateValue = event.target.value;
        this.inputDataForApex.State = this.stateValue;
        console.log('carrierName', this.stateValue);
    }
    handlePlaneName(event) {
        this.nameplaneValue = event.target.value;
        this.inputDataForApex.Plan_name = this.nameplaneValue;
        console.log('plan>>>', this.nameplaneValue);
    }
    handleclinicalarea(event) {
        this.clinicalareaValue = event.target.value;
        this.inputDataForApex.Clinical_area = this.clinicalareaValue;
        console.log('Clinical_area>>>', this.clinicalareaValue);
    }
    handlecondition(event) {
        this.conditionValue = event.target.value;
        this.inputDataForApex.Condition = this.conditionValue;
        console.log('Clinical_area>>>', this.conditionValue);
    }
    handletreatment(event) {
        this.treatmentValue = event.target.value;
        this.inputDataForApex.Treatment = this.treatmentValue;
        console.log('Clinical_area>>>', this.treatmentValue);
    }
    handlename(event) {
        this.NameValue = event.target.value;
        this.inputDataForApex.Name = this.NameValue;
        console.log('NameValue>>>', this.NameValue);
    }
    handleaddress(event) {
        this.addressValue = event.target.value;
        this.inputDataForApex.Address = this.addressValue;
        console.log('addressValue>>>', this.addressValue);
    }
    handleorganization(event) {
        this.organizationValue = event.target.value;
        this.inputDataForApex.Organization_types = this.organizationValue;
        console.log('Organization_types>>>', this.Organization_types);
    }
    //abhay onchange method end
    handleChangeSearchType(event) {
        this.searchType = event.detail.value;
        this.searchTypeSelected = !!this.searchType;
        this.locationSearch = this.searchType === 'LocationSearch';
        this.providerSearch = this.searchType === 'ProviderSearch';
        this.InsuranceSearch = this.searchType === 'InsuranceSearch';
        this.ClinicalSearch = this.searchType === 'ClinicalSearch';
        this.OrganizationSearch = this.searchType === 'OrganizationSearch';
        this.ProviderPriceSearch = this.searchType === 'ProviderPriceSearch';
        // this.resetFields();
    }

    handleChangeSpecialityType(event) {
        this.selectedSpeciality = event.detail.value;
        this.inputDataForApex.Speciality = this.selectedSpeciality;
    }
    // =====================================================================================================
    showSearchTypeDB=true;
    showProviderSearchTypeDB=false;
    showLocationSearchTypeDB=false;
    showProviderSearchResultCardDB=false;
    showLocationSearchResultCardDB=false;
    showProviderSearchResultDetailsDB=false;
    showLocationSearchResultDetailsDB=false;
    showSearchButtonDB=false;
    showBackButtonDB=false;
    showSpinnerDB=false;
    // ==
    showInsuranceSearchTypeDBN=false;
    showClinicalSearchTypeDBN=false;
    showOrganizationSearchTypeDBN=false;
    showProviderPriceSearchTypeDBN=false;

    showInsuranceSearchResultCardDBN=false;
    showClinicalSearchResultCardDBN=false;
    showOrganizationsSearchResultCardDBN=false;
    showProviderPriceSearchResultCardDBN=false;

    showInsuranceSearchResultDetailsDBN=false;
    showClinicalSearchResultDetailsDBN=false;
    showOrganizationsSearchResultDetailsDBN=false;
    showProviderPriceSearchResultDetailsDBN=false;
    // ==
    resetFieldsDB() {
        this.selectedSpeciality = '';
        this.npiValue = '';
        this.addressValue = '';
        this.nameValue = '';
        this.countryValue = '';
        this.locationaddressValue = '';
        this.statelocationValue = '';
        //abhay 
        this.carriernameValue='';
        this.stateValue='';
        this.nameplaneValue='';
        //abhay
    }
    handleSearchTypeDB(event){
        this.searchType=event.detail.value;
        let currentSearchType=event.detail.value;
        this.showProviderSearchTypeDB=currentSearchType=== 'ProviderSearch';
        this.showLocationSearchTypeDB=currentSearchType=== 'LocationSearch';
        this.showInsuranceSearchTypeDBN=currentSearchType=== 'InsuranceSearch';
        this.showClinicalSearchTypeDBN=currentSearchType=== 'ClinicalSearch';
        this.showOrganizationSearchTypeDBN=currentSearchType=== 'OrganizationSearch';
        // this.showProviderPriceSearchTypeDBN=currentSearchType=== 'ProviderPriceSearch';
        this.resetFieldsDB();
        this.showSearchButtonDB=true;
    }
    handleSearchDB(){
        console.log('handleSearchDB-start');
        console.log('showProviderSearchTypeDB1=>',this.showProviderSearchTypeDB);
        console.log('inputDataForApex.Npi2=>',this.inputDataForApex.Npi);
        console.log('inputDataForApex.Address3=>',this.inputDataForApex.Address);
        console.log('inputDataForApex.Name4=>',this.inputDataForApex.Name);
        console.log('inputDataForApex.Provider_type5=>',this.inputDataForApex.Provider_type);
        if (this.showProviderSearchTypeDB && !this.inputDataForApex.Npi && !this.inputDataForApex.Address && !this.inputDataForApex.Name && !this.inputDataForApex.Provider_type) {
            this.showToast('Error', 'Please enter at least one search criteria (NPI, Address, Name Or Speciality)', 'error');
            return;
        } 
        else if (this.showLocationSearchTypeDB && !this.inputDataForApex.Country && !this.inputDataForApex.Address && !this.inputDataForApex.State && !this.inputDataForApex.Name) {
            this.showToast('Error', 'Please enter at least one search criteria (Country, Address,Name or State)', 'error');
            return;
        }
        else if (this.showInsuranceSearchTypeDBN && !this.inputDataForApex.Carrier_name && !this.inputDataForApex.Plan_name && !this.inputDataForApex.State) {
            this.showToast('Error', 'Please enter at least one search criteria (Carrier_name, Plan_Name or State)', 'error');
            return;
        }
        else if (this.showClinicalSearchTypeDBN && !this.inputDataForApex.Clinical_area && !this.inputDataForApex.Condition && !this.inputDataForApex.Treatment) {
            this.showToast('Error', 'Please enter at least one search criteria (Clinical_area, Condition or Treatment)', 'error');
            return;
        }
        else if (this.showOrganizationSearchTypeDBN && !this.inputDataForApex.Name && !this.inputDataForApex.Address && !this.inputDataForApex.Organization_types) {
            this.showToast('Error', 'Please enter at least one search criteria (Name, Address or Organization_types)', 'error');
            return;
        }
        
        this.showSpinnerDB=true;
        const timeoutDuration = 2000;
        setTimeout(() => {
        getProviderInfo({ mapParameter: { ...this.inputDataForApex }, searchType: this.searchType })
                .then(result => {
                    // console.log('handleSearchDB-result: ',result);
                    console.log('>>>>',JSON.stringify(result));
                    if (result === null) {
                        this.showToast('Information', 'Currently, the API is not available.', 'info');
                        console.log('handleSearchDB-null');
                    } else if (result.length === 0) {
                        console.log('handleSearchDB-0',this.showProviderSearchTypeDB);
                        this.showToast('Information', 'No data found for the given Information.', 'info');
                        this.providerData = [];
                        this.providerDatalocation = [];
                        this.showSearchTypeDB=true;
                        // ============================
                        this.showProviderSearchTypeDB=this.showProviderSearchTypeDB;
                        // this.showProviderSearchTypeDB=true;
                        // ============================
                        this.showLocationSearchTypeDB=this.showLocationSearchTypeDB;
                        // this.showLocationSearchTypeDB=false;
                        this.showProviderSearchResultCardDB=false;
                        this.showLocationSearchResultCardDB=false;
                        this.showProviderSearchResultDetailsDB=false;
                        this.showLocationSearchResultDetailsDB=false;
                        this.showSearchButtonDB=true;
                        this.showBackButtonDB=false;
                        this.showSpinnerDB=false;
                        // abhay
                        this.showInsuranceSearchResultCardDBN=false;
                        this.showClinicalSearchResultCardDBN=false;
                        this.showOrganizationsSearchResultCardDBN=false;
                        // abhay
                    } else {
                        console.log('handleSearchDB-else: ',this.showProviderSearchTypeDB);
                        if (this.showProviderSearchTypeDB===true) {
                            console.log('handleSearchDB-else-if');
                            this.providerData = result;
                            this.showSearchTypeDB=false;
                            this.showProviderSearchTypeDB=false;
                            this.showLocationSearchTypeDB=false;
                            this.showProviderSearchResultCardDB=true;
                            this.showLocationSearchResultCardDB=false;
                            this.showProviderSearchResultDetailsDB=false;
                            this.showLocationSearchResultDetailsDB=false;
                            this.showSearchButtonDB=false;
                            this.showBackButtonDB=true;
                            this.showSpinnerDB=false;
                            // abhay
                            this.showInsuranceSearchResultCardDBN=false;
                            this.showClinicalSearchResultCardDBN=false;
                            this.showOrganizationsSearchResultCardDBN=false;
                            // abhay
                        } else if (this.showLocationSearchTypeDB===true) {
                            console.log('handleSearchDB-else-else-if: ',this.showLocationSearchTypeDB);
                            this.locationData = result;
                            this.showSearchTypeDB=false;
                            this.showProviderSearchTypeDB=false;
                            this.showLocationSearchTypeDB=false;
                            this.showProviderSearchResultCardDB=false;
                            this.showLocationSearchResultCardDB=true;
                            this.showProviderSearchResultDetailsDB=false;
                            this.showLocationSearchResultDetailsDB=false;
                            this.showSearchButtonDB=false;
                            this.showBackButtonDB=true;
                            this.showSpinnerDB=false;
                            // abhay
                            this.showInsuranceSearchResultCardDBN=false;
                            this.showInsuranceSearchTypeDBN=false;
                            this.showInsuranceSearchResultDetailsDBN=false;

                            this.showClinicalSearchTypeDBN=false;
                            this.showClinicalSearchResultCardDBN=false;
                            this.showOrganizationsSearchResultCardDBN=false;
                            // abhay
                        }
                        else if (this.showInsuranceSearchTypeDBN===true) {
                            console.log('handleSearchDB-showInsuranceSearchTypeDBN:>>> ',this.showInsuranceSearchTypeDBN);
                            this.insuranceData = result;
                            this.showSearchTypeDB=false;
                            this.showProviderSearchTypeDB=false;
                            this.showLocationSearchTypeDB=false;
                            this.showProviderSearchResultCardDB=false;
                            this.showLocationSearchResultCardDB=false;
                            this.showProviderSearchResultDetailsDB=false;
                            this.showLocationSearchResultDetailsDB=false;
                            this.showSearchButtonDB=false;
                            this.showBackButtonDB=true;
                            this.showSpinnerDB=false;
                            // abhay
                            this.showInsuranceSearchTypeDBN=false;
                            this.showInsuranceSearchResultCardDBN=true;
                            this.showInsuranceSearchResultDetailsDBN=false;
                            this.showClinicalSearchTypeDBN=false;
                            this.showClinicalSearchResultCardDBN=false;
                            this.showOrganizationsSearchResultCardDBN=false;
                        }
                        else if (this.showClinicalSearchTypeDBN===true) {
                            console.log('handleSearchDB-showClinicalSearchTypeDBN:>>> ',this.showClinicalSearchTypeDBN);
                            this.clinicalData = result;
                            this.showSearchTypeDB=false;
                            this.showProviderSearchTypeDB=false;
                            this.showLocationSearchTypeDB=false;
                            this.showProviderSearchResultCardDB=false;
                            this.showLocationSearchResultCardDB=false;
                            this.showProviderSearchResultDetailsDB=false;
                            this.showLocationSearchResultDetailsDB=false;
                            this.showSearchButtonDB=false;
                            this.showBackButtonDB=true;
                            this.showSpinnerDB=false;
                            this.showInsuranceSearchTypeDBN=false;
                            this.showClinicalSearchTypeDBN=false;
                            this.showInsuranceSearchResultCardDBN=false;
                            this.showInsuranceSearchResultDetailsDBN=false;
                            this.showClinicalSearchResultCardDBN=true;
                            this.showOrganizationsSearchResultCardDBN=false;
                        }
                        else if (this.showOrganizationSearchTypeDBN===true) {
                            console.log('handleSearchDB-showOrganizationSearchTypeDBN:>>> ',this.showOrganizationSearchTypeDBN);
                            this.organizationData = result;
                            this.showSearchTypeDB=false;
                            this.showProviderSearchTypeDB=false;
                            this.showLocationSearchTypeDB=false;
                            this.showProviderSearchResultCardDB=false;
                            this.showLocationSearchResultCardDB=false;
                            this.showProviderSearchResultDetailsDB=false;
                            this.showLocationSearchResultDetailsDB=false;
                            this.showSearchButtonDB=false;
                            this.showBackButtonDB=true;
                            this.showSpinnerDB=false;
                            // abhay
                            this.showInsuranceSearchTypeDBN=false;
                            this.showClinicalSearchTypeDBN=false;
                            this.showInsuranceSearchResultCardDBN=false;
                            this.showInsuranceSearchResultDetailsDBN=false;
                            this.showClinicalSearchResultCardDBN=false;
                            this.showOrganizationsSearchResultCardDBN=true;
                            this.showOrganizationSearchTypeDBN=false;

                            // abhay
                        }
                    }
                })

                .catch(error => {
                    console.error('handleSearchDB-catch: ', error);
                    this.showToast('Error', 'An error occurred while fetching provider info.', 'error');
                    this.showSpinnerDB = false;
                })
                .finally(() => {
                    console.log('handleSearchDB-final');
                    this.showSpinnerDB = false;
                });
            // this.inputDataForApex = {};
            console.log('handleSearchDB-end');
    }, timeoutDuration);
}
    handleShowDetails(){
        console.log('handleShowDetails-showProviderSearchResultCardDB: ',this.showProviderSearchResultCardDB);
        console.log('handleShowDetails-showLocationSearchResultCardDB: ',this.showLocationSearchResultCardDB);
        if(this.showProviderSearchResultCardDB===true){
            console.log('handleShowDetails-showProviderSearchResultCardDB>>>>');
            this.showSearchTypeDB=false;
            this.showProviderSearchTypeDB=false;
            this.showLocationSearchTypeDB=false;
            this.showProviderSearchResultCardDB=true;
            this.showLocationSearchResultCardDB=false;
            // this.showProviderSearchResultDetailsDB=true;
            this.showProviderSearchResultDetailsDB=!this.showProviderSearchResultDetailsDB;
            this.showLocationSearchResultDetailsDB=false;
            this.showSearchButtonDB=false;
            this.showBackButtonDB=true;
            this.showSpinnerDB=false;
        }else if(this.showLocationSearchResultCardDB===true){
            console.log('handleShowDetails-Location-else-if=->>>');
            this.showSearchTypeDB=false;
            this.showProviderSearchTypeDB=false;
            this.showLocationSearchTypeDB=false;
            this.showProviderSearchResultCardDB=false;
            this.showLocationSearchResultCardDB=true;
            this.showProviderSearchResultDetailsDB=false;
            this.showLocationSearchResultDetailsDB=!this.showLocationSearchResultDetailsDB;
            this.showSearchButtonDB=false;
            this.showBackButtonDB=true;
            this.showSpinnerDB=false;
        }
        else if(this.showInsuranceSearchResultCardDBN===true){
            console.log('handleShowDetails-showInsuranceSearchResultCardDBN=->>>',this.showInsuranceSearchResultCardDBN);
            this.showSearchTypeDB=false;
            this.showProviderSearchTypeDB=false;
            this.showLocationSearchTypeDB=false;
            this.showProviderSearchResultCardDB=false;
            this.showLocationSearchResultCardDB=false;
            this.showProviderSearchResultDetailsDB=false;
            // this.showLocationSearchResultDetailsDB=!this.showLocationSearchResultDetailsDB;
            this.showInsuranceSearchResultCardDBN=true;
            this.showInsuranceSearchResultDetailsDBN=!this.showInsuranceSearchResultDetailsDBN;
            // this.showInsuranceSearchResultDetailsDBN=!this.showInsuranceSearchResultDetailsDBN;
            this.showSearchButtonDB=false;
            this.showBackButtonDB=true;
            this.showSpinnerDB=false;
        }
        else if(this.showClinicalSearchResultCardDBN===true){
            console.log('handleShowDetails-showClinicalSearchResultCardDBN=->>>',this.showClinicalSearchResultCardDBN);
            this.showSearchTypeDB=false;
            this.showProviderSearchTypeDB=false;
            this.showLocationSearchTypeDB=false;
            this.showProviderSearchResultCardDB=false;
            this.showLocationSearchResultCardDB=false;
            this.showProviderSearchResultDetailsDB=false;
            // this.showLocationSearchResultDetailsDB=!this.showLocationSearchResultDetailsDB;
            this.showInsuranceSearchResultCardDBN=false;
            this.showClinicalSearchResultCardDBN=true;
            this.showClinicalSearchResultDetailsDBN=!this.showClinicalSearchResultDetailsDBN;
            this.showSearchButtonDB=false;
            this.showBackButtonDB=true;
            this.showSpinnerDB=false;
        }
        else if(this.showOrganizationsSearchResultCardDBN===true){
            console.log('handleShowDetails-showClinicalSearchResultCardDBN=->>>',this.showClinicalSearchResultCardDBN);
            this.showSearchTypeDB=false;
            this.showProviderSearchTypeDB=false;
            this.showLocationSearchTypeDB=false;
            this.showProviderSearchResultCardDB=false;
            this.showLocationSearchResultCardDB=false;
            this.showProviderSearchResultDetailsDB=false;
            // this.showLocationSearchResultDetailsDB=!this.showLocationSearchResultDetailsDB;
            this.showInsuranceSearchResultCardDBN=false;
            this.showClinicalSearchResultCardDBN=false;
            this.showOrganizationsSearchResultCardDBN=true;
            this.showOrganizationsSearchResultDetailsDBN=!this.showOrganizationsSearchResultDetailsDBN;
            this.showSearchButtonDB=false;
            this.showBackButtonDB=true;
            this.showSpinnerDB=false;
        }
        console.log('handleShowDetails-end');
    }
    handleBackDB(){
        console.log('back buttom:>>> //',this.showProviderSearchResultCardDB);
        console.log('handleShowDetails-showLocationSearchResultCardDB: ',this.showLocationSearchResultCardDB);
        console.log('handleShowDetails-showInsurancesSearchResultCardDB: ',this.showInsurancesSearchResultCardDB);
        if(this.showProviderSearchResultCardDB===true){
            this.showSearchTypeDB=true;
            this.showProviderSearchTypeDB=true;
            this.showLocationSearchTypeDB=false;
            this.showProviderSearchResultCardDB=false;
            this.showLocationSearchResultCardDB=false;
            this.showInsurancesSearchResultCardDB=false;
            this.showProviderSearchResultDetailsDB=false;
            this.showLocationSearchResultDetailsDB=false;
            this.showSearchButtonDB=true;
            this.showBackButtonDB=false;
            this.showSpinnerDB=false;
        }
        else if(this.showLocationSearchResultCardDB===true){
            this.showSearchTypeDB=true;
            this.showProviderSearchTypeDB=false;
            this.showLocationSearchTypeDB=true;
            this.showProviderSearchResultCardDB=false;
            this.showLocationSearchResultCardDB=false;
            this.showInsurancesSearchResultCardDB=false;
            this.showProviderSearchResultDetailsDB=false;
            this.showLocationSearchResultDetailsDB=false;
            this.showSearchButtonDB=true;
            this.showBackButtonDB=false;
            this.showSpinnerDB=false;
        }
        else if(this.showInsuranceSearchResultCardDBN===true){
            this.showSearchTypeDB=true;
            this.showProviderSearchTypeDB=false;
            this.showLocationSearchTypeDB=false;
            this.showProviderSearchResultCardDB=false;
            this.showLocationSearchResultCardDB=false;
            this.showInsurancesSearchResultCardDB=false;
            this.showProviderSearchResultDetailsDB=false;
            this.showLocationSearchResultDetailsDB=false;
            this.showSearchButtonDB=true;
            this.showBackButtonDB=false;
            this.showSpinnerDB=false;
            // abhay
            this.showInsuranceSearchResultCardDBN=false;
            this.showInsuranceSearchTypeDBN=true;
            this.showInsuranceSearchResultDetailsDBN=false;
            // abhay
        }
        else if(this.showClinicalSearchResultCardDBN===true){
            this.showSearchTypeDB=true;
            this.showProviderSearchTypeDB=false;
            this.showLocationSearchTypeDB=false;
            this.showProviderSearchResultCardDB=false;
            this.showLocationSearchResultCardDB=false;
            this.showInsurancesSearchResultCardDB=false;
            this.showProviderSearchResultDetailsDB=false;
            this.showLocationSearchResultDetailsDB=false;
            this.showSearchButtonDB=true;
            this.showBackButtonDB=false;
            this.showSpinnerDB=false;
            // abhay
            this.showInsuranceSearchResultCardDBN=false;
            this.showClinicalSearchTypeDBN=true;
            this.showInsuranceSearchResultDetailsDBN=false;
            this.showClinicalSearchResultDetailsDBN=false;
            this.showClinicalSearchResultCardDBN=false;
            // abhay
        }
        else if(this.showOrganizationsSearchResultCardDBN===true){
            this.showSearchTypeDB=true;
            this.showProviderSearchTypeDB=false;
            this.showLocationSearchTypeDB=false;
            this.showProviderSearchResultCardDB=false;
            this.showLocationSearchResultCardDB=false;
            this.showInsurancesSearchResultCardDB=false;
            this.showProviderSearchResultDetailsDB=false;
            this.showLocationSearchResultDetailsDB=false;
            this.showSearchButtonDB=true;
            this.showBackButtonDB=false;
            this.showSpinnerDB=false;
            // abhay
            this.showInsuranceSearchResultCardDBN=false;
            this.showClinicalSearchTypeDBN=false;
            this.showOrganizationSearchTypeDBN=true;
            this.showInsuranceSearchResultDetailsDBN=false;
            this.showClinicalSearchResultDetailsDBN=false;
            this.showClinicalSearchResultCardDBN=false;
            this.showOrganizationsSearchResultCardDBN=false;
            this.showOrganizationsSearchResultDetailsDBN=false;
            // abhay
        }
        console.log('handleBackDB-start');
        // this.resetFieldsDB();
        console.log('handleBackDB-end>');
    }
     
    // =====================================================================================================
    // handleBackClick() {
    //     this.resetFields();
    //     this.searchTypeSelected = true;
    //     this.displayFields = false;
    //     this.locationdisplayfields = false;
    // }

    // resetFields() {
    //     this.displayFields = false;
    //     this.locationdisplayfields = false;
    //     this.selectedSpeciality = '';
    //     this.npiValue = '';
    //     this.addressValue = '';
    //     this.nameValue = '';
    //     this.countryValue = '';
    //     this.locationaddressValue = '';
    //     this.statelocationValue = '';
    // }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }
}