public with sharing class providerSearchWrapper {
    public Parameters parameters;
    public class Parameters {
        public Integer total_count;
        public String sort_by;
        public Geo geo { get; set; }
        public Integer page { get; set; }
        public Integer page_size { get; set; }
        public Integer max_locations { get; set; }
        public List<String> fields { get; set; }
        public List<Long> npis { get; set; }
        public String name;
        
        public String provider_types { get; set; }
        // public List<String> provider_types { get; set; }
        public String gender { get; set; }
        public Integer max_age { get; set; }
        public Integer min_age { get; set; }
        public Language language { get; set; }
        public Integer min_rating { get; set; }
        public String address { get; set; }
        public List<String> location_ids { get; set; }
        public Integer min_location_confidence { get; set; }
        public Integer min_confidence { get; set; }
        public Integer distance { get; set; }
        public String state { get; set; }
        public List<String> insurance_ids { get; set; }
        public String insurance_carrier_name { get; set; }
        public List<String> location_insurance_ids { get; set; }
        public Boolean national_bluecard { get; set; }
        public List<String> specialty_ids { get; set; }
        public List<Specialty> specialty { get; set; }
        public List<String> specialty_ids_primary { get; set; }
        public PrimarySpecialty primary_specialty { get; set; }
        public Boolean apply_specialty_grouping { get; set; }
        public List<String> procedure_ids { get; set; }
        public Procedure procedure { get; set; }
        public Integer min_experience_index { get; set; }
        public Integer max_cost_index { get; set; }
        public String clinical_area { get; set; }
        public ClinicalAreaIds clinical_area_ids { get; set; }
        public Condition condition { get; set; }
        public List<String> condition_ids { get; set; }
        public Treatment treatment { get; set; }
        public List<String> treatment_ids { get; set; }
        public List<String> panel_ages { get; set; }
        public String panel_sexes { get; set; }
        public Integer min_outcomes_index { get; set; }
        public Integer min_efficiency_index { get; set; }
        public Integer max_unit_cost_index { get; set; }
        public Integer max_ribbon_cost_score { get; set; }
        public List<String> location_organization_ids { get; set; }
        public Inclusions inclusions { get; set; }
        public Exclusions exclusions { get; set; }
    }
    
    public class Geo {
        public Double latitude { get; set; }
        public Double longitude { get; set; }
    }
    
    public class Language {
        public List<String> results { get; set; }
        public String value { get; set; }
    }
    
    public class Specialty {
        public String uuid { get; set; }
        public String taxonomy_code { get; set; }
        public String board_specialty { get; set; }
        public String board_sub_specialty { get; set; }
        public String non_md_specialty { get; set; }
        public String non_md_sub_specialty { get; set; }
        public String provider_name { get; set; }
        public String colloquial { get; set; }
        public String taxonomy_1 { get; set; }
        public String taxonomy_2 { get; set; }
        public String taxonomy_3 { get; set; }
        public String display { get; set; }
        public String provider_type { get; set; }
        public Boolean is_primary { get; set; }
    }
    
    public class PrimarySpecialty {
        public String uuid { get; set; }
        public String taxonomy_code { get; set; }
        public String board_specialty { get; set; }
        public String board_sub_specialty { get; set; }
        public String non_md_specialty { get; set; }
        public String non_md_sub_specialty { get; set; }
        public String provider_name { get; set; }
        public String colloquial { get; set; }
        public String taxonomy_1 { get; set; }
        public String taxonomy_2 { get; set; }
        public String taxonomy_3 { get; set; }
        public String display { get; set; }
        public String provider_type { get; set; }
        public Boolean is_primary { get; set; }
    }
    
    public class Procedure {
        public String uuid { get; set; }
        public String display { get; set; }
        public Integer procedure_code_count { get; set; }
        public List<ProcedureCode> procedure_codes { get; set; }
    }
    
    public class ProcedureCode {
        public String code { get; set; }
        public String type { get; set; }
        public String description { get; set; }
    }
    
    public class ClinicalAreaIds {
        public String uuid { get; set; }
        public String display { get; set; }
        public List<String> types { get; set; }
        public List<Condition> conditions { get; set; }
        public List<Treatment> treatments { get; set; }
        public List<Specialty> specialties { get; set; }
    }
    
    public class Condition {
        public String uuid { get; set; }
        public String display { get; set; }
        public List<String> types { get; set; }
        public List<Specialty> specialties { get; set; }
        public List<String> modules { get; set; }
    }
    
    public class Treatment {
        public String uuid { get; set; }
        public String display { get; set; }
        public List<String> types { get; set; }
        public List<Specialty> specialties { get; set; }
    }
    
    public class Inclusions {
        public List<String> specialty_ids { get; set; }
        public List<String> specialty_ids_primary { get; set; }
    }
    
    public class Exclusions {
        public List<String> provider_types { get; set; }
        public List<String> insurance_ids { get; set; }
        public List<String> location_insurance_ids { get; set; }
        public List<String> location_ids { get; set; }
        public List<String> location_organization_ids { get; set; }
        public List<String> specialty_ids { get; set; }
        public List<String> specialty_ids_primary { get; set; }
        public List<String> procedure_ids { get; set; }
        public Language language { get; set; }
    }
    public List<ProviderData> data;
    public class ProviderData {
        public String country;
        public String phone;
        public String state;
        public String city;
        public String provider_name;
        public String organization_types;
        public String clinical_area;
        public String condition;
        public String treatment;
        public String type;
        public String name;
        // public String provider_type;
        public String carrier_name;
        public String plan_name;
        public String category;
        public String carrier_association;
        public String carrier_brand;
        public String plan_type;
        public String display_name;
        public String npi { get; set; }
        public String first_name { get; set; }
        public String middle_name { get; set; }
        public String last_name { get; set; }
        public Integer age { get; set; }
        public String gender { get; set; }
        public Integer ratings_count { get; set; }
        public Double ratings_avg { get; set; }
        public List<String> degrees { get; set; }
        public List<Specialty> specialties { get; set; }
        public List<String> languages { get; set; }
        public List<Education> educations { get; set; }
        public List<Insurance> insurances { get; set; }
        public List<String> provider_types { get; set; }
        public List<Location> locations { get; set; }
        public List<OnlineProfile> online_profiles { get; set; }
    }
    public class Education {
        public EducationDetails education { get; set; }
        public String type { get; set; }
        public Integer year { get; set; }
    }
    public class EducationDetails {
        public String name { get; set; }
        public String uuid { get; set; }
    }
    public class Insurance {
        public String uuid { get; set; }
        public String carrier_association { get; set; }
        public String carrier_brand { get; set; }
        public String carrier_name { get; set; }
        public String state { get; set; }
        public String plan_name { get; set; }
        public String plan_type { get; set; }
        public String metal_level { get; set; }
        public String display_name { get; set; }
        public String network { get; set; }
        public Integer confidence { get; set; }
        public String category { get; set; }
        public List<String> codes { get; set; }
    }   
    public class Location {
        public String state;
        public String address_line_2;
        public String address_line_1;
        // public String address;
        public String uuid { get; set; }
        public String name { get; set; }
        public String address { get; set; }
        public AddressDetails address_details { get; set; }
        public Double latitude { get; set; }
        public Double longitude { get; set; }
        public String google_maps_link { get; set; }
        public List<PhoneNumber> phone_numbers { get; set; }
        public List<Fax> faxes { get; set; }
        public Integer confidence { get; set; }
        public List<Insurance> insurances { get; set; }
        public Double distance { get; set; }
    }
    
    public class AddressDetails {
        public String street { get; set; }
        public String street2 { get; set; }
        public String city { get; set; }
        public String state { get; set; }
        public String zip { get; set; }
        public String country { get; set; }
        public String address_line_2;
        public String address_line_1;
    }
    
    public class PhoneNumber {
        public String type { get; set; }
        public String phone { get; set; }
    }
    
    public class Fax {
        public String type { get; set; }
    }
    
    public class OnlineProfile {
        public String type { get; set; }
        public String url { get; set; }
    }
    
    public class Root {
        public Boolean success { get; set; }
        // public List<Data> data { get; set; }
        public Parameters parameters { get; set; }
        public String request_id { get; set; }
    }
}
