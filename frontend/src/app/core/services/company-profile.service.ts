import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CompanyProfileResponse {
  id?: number;
  userId?: number;
  raisonSociale?: string;
  enseigne?: string;
  formeJuridique?: string;
  regime?: string;
  capitalSocial?: string;
  email?: string;
  adresse?: string;
  ville?: string;
  telephoneFax?: string;
  activite?: string;
  registreCommerce?: string;
  matriculeFiscal?: string;
  numEmployeurCnss?: string;
  dateOuverture?: string | null;
  publicationJort?: string;
  codeDouane?: string;
  activiteSecondaire?: string;
  dateEffet?: string | null;

  manager?: CompanyProfileManager;
  capitalStructure?: CapitalStructureEntry[];
  tenantInfo?: CompanyProfileTenant;
  fees?: CompanyProfileFees;
  observation?: string;
  legalDocuments?: CompanyProfileLegalDocument[];
  softwareDeposits?: CompanyProfileSoftwareDeposit[];
}

export interface CompanyProfileManager {
  nomPrenom?: string;
  dateLieuNaissance?: string;
  nationalite?: string;
  adresse?: string;
  situationFamiliale?: string;
  passCin?: string;
  numCnss?: string;
}

export interface CapitalStructureEntry {
  id?: number;
  nomPrenom?: string;
  partsPourcentage?: number;
}

export interface CompanyProfileTenant {
  nomPrenom?: string;
  dateLieuNaissance?: string;
  nationalite?: string;
  adresse?: string;
  passCin?: string;
  debutContrat?: string | null;
  montantLoyer?: string;
  observationsAugmentation?: string;
}

export interface CompanyProfileFees {
  responsableDossier?: string;
  dateEffet?: string | null;
  montantHonoraires?: string;
  observationsAugmentation?: string;
}

export interface CompanyProfileLegalDocument {
  id?: number;
  type?: string;
  status?: string;
  filePath?: string;
  notes?: string;
}

export interface CompanyProfileSoftwareDeposit {
  id?: number;
  label?: string;
  date?: string | null;
  notes?: string;
}

@Injectable({ providedIn: 'root' })
export class CompanyProfileService {
  constructor(private http: HttpClient) {}

  getMyProfile(): Observable<CompanyProfileResponse> {
    return this.http.get<CompanyProfileResponse>('/api/clients/me/company-profile');
  }

  saveMyProfile(payload: any): Observable<CompanyProfileResponse> {
    return this.http.post<CompanyProfileResponse>('/api/clients/me/company-profile', payload);
  }

  saveCore(payload: Partial<CompanyProfileResponse>): Observable<CompanyProfileResponse> {
    return this.http.post<CompanyProfileResponse>('/api/clients/me/company-profile/core', payload);
  }

  saveManager(payload: CompanyProfileManager): Observable<CompanyProfileResponse> {
    return this.http.put<CompanyProfileResponse>('/api/clients/me/company-profile/manager', payload);
  }

  saveCapitalStructure(list: CapitalStructureEntry[]): Observable<CompanyProfileResponse> {
    return this.http.put<CompanyProfileResponse>('/api/clients/me/company-profile/capital-structure', list);
  }
}
