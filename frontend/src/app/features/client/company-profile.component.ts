import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { CompanyProfileService, CapitalStructureEntry, CompanyProfileLegalDocument, CompanyProfileSoftwareDeposit } from '../../core/services/company-profile.service';

@Component({
  standalone: true,
  selector: 'app-company-profile',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatExpansionModule, MatSelectModule, RouterLink],
  template: `
  <div class="profile-page">
    <mat-card class="profile-card">
      <div class="page-header">
        <div class="header-copy">
          <span class="eyebrow">Profil entreprise</span>
          <h2>Fiche des Informations</h2>
        </div>
        <button mat-stroked-button type="button" class="secondary-btn" routerLink="/home">
          <mat-icon>arrow_back</mat-icon>
          <span>Retour</span>
        </button>
      </div>

      <form [formGroup]="form" (ngSubmit)="saveCore()" class="profile-form">
        <div *ngIf="errorMessage" class="error-banner" role="alert">
          <mat-icon>error</mat-icon>
          <span>{{ errorMessage }}</span>
        </div>

        <div class="summary-grid">
          <mat-form-field appearance="outline" class="full">
            <mat-label>Raison sociale</mat-label>
            <input matInput formControlName="raisonSociale" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Enseigne</mat-label>
            <input matInput formControlName="enseigne" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Adresse</mat-label>
            <input matInput formControlName="adresse" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Ville</mat-label>
            <input matInput formControlName="ville" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Téléphone / Fax</mat-label>
            <input matInput formControlName="telephoneFax" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Activité</mat-label>
            <input matInput formControlName="activite" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Observation</mat-label>
            <input matInput formControlName="observation" />
          </mat-form-field>
        </div>

        <mat-accordion>
          <mat-expansion-panel class="profile-panel" [disabled]="!coreExists">
            <mat-expansion-panel-header>
              <mat-panel-title>Général</mat-panel-title>
            </mat-expansion-panel-header>
            <div class="general-grid">
              <mat-form-field appearance="outline" class="full">
                <mat-label>Raison sociale</mat-label>
                <input matInput formControlName="raisonSociale" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="full">
                <mat-label>Enseigne</mat-label>
                <input matInput formControlName="enseigne" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="full">
                <mat-label>Forme juridique</mat-label>
                <input matInput formControlName="formeJuridique" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="full">
                <mat-label>Régime</mat-label>
                <input matInput formControlName="regime" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="full">
                <mat-label>Capital social</mat-label>
                <input matInput formControlName="capitalSocial" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="full">
                <mat-label>Registre commerce</mat-label>
                <input matInput formControlName="registreCommerce" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="full">
                <mat-label>Matricule fiscal</mat-label>
                <input matInput formControlName="matriculeFiscal" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="full">
                <mat-label>Numéro employeur CNSS</mat-label>
                <input matInput formControlName="numEmployeurCnss" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="full">
                <mat-label>Date ouverture</mat-label>
                <input matInput formControlName="dateOuverture" placeholder="YYYY-MM-DD" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="full">
                <mat-label>Publication JORT</mat-label>
                <input matInput formControlName="publicationJort" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="full">
                <mat-label>Code douane</mat-label>
                <input matInput formControlName="codeDouane" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="full">
                <mat-label>Activité secondaire</mat-label>
                <input matInput formControlName="activiteSecondaire" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="full">
                <mat-label>Date effet</mat-label>
                <input matInput formControlName="dateEffet" placeholder="YYYY-MM-DD" />
              </mat-form-field>
            </div>
          </mat-expansion-panel>

          <mat-expansion-panel class="profile-panel" [disabled]="!coreExists">
            <mat-expansion-panel-header>
              <mat-panel-title>Gérant (Manager)</mat-panel-title>
            </mat-expansion-panel-header>
            <div [formGroup]="managerGroup" class="section-grid">
              <mat-form-field appearance="outline" class="full">
                <mat-label>Nom & Prénom</mat-label>
                <input matInput formControlName="nomPrenom" />
              </mat-form-field>
              <mat-form-field appearance="outline" class="full">
                <mat-label>Date / Lieu de naissance</mat-label>
                <input matInput formControlName="dateLieuNaissance" />
              </mat-form-field>
              <mat-form-field appearance="outline" class="full">
                <mat-label>Nationalité</mat-label>
                <input matInput formControlName="nationalite" />
              </mat-form-field>
            </div>
            <div class="panel-actions">
              <button mat-flat-button color="primary" type="button" class="primary-btn" (click)="saveManager()">Sauvegarder Gérant</button>
            </div>
          </mat-expansion-panel>

          <mat-expansion-panel class="profile-panel" [disabled]="!coreExists">
            <mat-expansion-panel-header>
              <mat-panel-title>Locataire (Tenant)</mat-panel-title>
            </mat-expansion-panel-header>
            <div [formGroup]="tenantGroup" class="section-grid">
              <mat-form-field appearance="outline" class="full">
                <mat-label>Nom & Prénom</mat-label>
                <input matInput formControlName="nomPrenom" />
              </mat-form-field>
              <mat-form-field appearance="outline" class="full">
                <mat-label>Début contrat</mat-label>
                <input matInput formControlName="debutContrat" />
              </mat-form-field>
              <mat-form-field appearance="outline" class="full">
                <mat-label>Montant loyer</mat-label>
                <input matInput formControlName="montantLoyer" />
              </mat-form-field>
            </div>
          </mat-expansion-panel>

          <mat-expansion-panel class="profile-panel" [disabled]="!coreExists">
            <mat-expansion-panel-header>
              <mat-panel-title>Honoraires (Fees)</mat-panel-title>
            </mat-expansion-panel-header>
            <div [formGroup]="feesGroup" class="section-grid">
              <mat-form-field appearance="outline" class="full">
                <mat-label>Responsable dossier</mat-label>
                <input matInput formControlName="responsableDossier" />
              </mat-form-field>
              <mat-form-field appearance="outline" class="full">
                <mat-label>Montant honoraires</mat-label>
                <input matInput formControlName="montantHonoraires" />
              </mat-form-field>
            </div>
          </mat-expansion-panel>

          <mat-expansion-panel class="profile-panel" [disabled]="!coreExists">
            <mat-expansion-panel-header>
              <mat-panel-title>Répartition du capital</mat-panel-title>
            </mat-expansion-panel-header>
            <div formArrayName="capitalStructure" class="stacked-list">
              <div *ngFor="let ctrl of capital.controls; let i = index" [formGroupName]="i" class="inline-row">
                <mat-form-field appearance="outline" class="inline-field">
                  <mat-label>Nom & Prénom</mat-label>
                  <input matInput formControlName="nomPrenom" />
                </mat-form-field>
                <mat-form-field appearance="outline" class="percentage-field">
                  <mat-label>% Parts</mat-label>
                  <input matInput formControlName="partsPourcentage" type="number" />
                </mat-form-field>
                <button mat-icon-button color="warn" type="button" (click)="removeCapital(i)" aria-label="Supprimer la répartition">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
              <button mat-stroked-button color="primary" type="button" class="secondary-btn" (click)="addCapital()">Ajouter</button>
            </div>
          </mat-expansion-panel>

          <mat-expansion-panel class="profile-panel" [disabled]="!coreExists">
            <mat-expansion-panel-header>
              <mat-panel-title>Documents légaux</mat-panel-title>
            </mat-expansion-panel-header>
            <div formArrayName="legalDocuments" class="stacked-list">
              <div *ngFor="let ld of legal.controls; let i = index" [formGroupName]="i" class="document-row">
                <mat-form-field appearance="outline" class="document-type">
                  <mat-label>Type</mat-label>
                  <mat-select formControlName="type">
                    <mat-option value="STATUT">STATUT</mat-option>
                    <mat-option value="PATENTE">PATENTE</mat-option>
                    <mat-option value="DECLARATION_EXISTENCE">DECLARATION_EXISTENCE</mat-option>
                    <mat-option value="REGISTRE_COMMERCE">REGISTRE_COMMERCE</mat-option>
                    <mat-option value="JORT">JORT</mat-option>
                    <mat-option value="JOURNAUX_QUOTIDIENS">JOURNAUX_QUOTIDIENS</mat-option>
                    <mat-option value="AFFILIATION_CNSS">AFFILIATION_CNSS</mat-option>
                    <mat-option value="CONTRAT_LOCATION">CONTRAT_LOCATION</mat-option>
                    <mat-option value="REGISTRE_COMPTABLE">REGISTRE_COMPTABLE</mat-option>
                    <mat-option value="CIN_GERANT">CIN_GERANT</mat-option>
                    <mat-option value="AFFILIATION_CNSS_GERANT">AFFILIATION_CNSS_GERANT</mat-option>
                  </mat-select>
                </mat-form-field>
                <mat-form-field appearance="outline" class="document-status">
                  <mat-label>Status</mat-label>
                  <mat-select formControlName="status">
                    <mat-option value="MISSING">MISSING</mat-option>
                    <mat-option value="RECEIVED">RECEIVED</mat-option>
                    <mat-option value="PENDING">PENDING</mat-option>
                  </mat-select>
                </mat-form-field>
                <mat-form-field appearance="outline" class="document-notes">
                  <mat-label>Notes / filePath</mat-label>
                  <input matInput formControlName="filePath" />
                </mat-form-field>
                <button mat-icon-button color="warn" type="button" (click)="removeLegal(i)" aria-label="Supprimer le document">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
              <button mat-stroked-button color="primary" type="button" class="secondary-btn" (click)="addLegal()">Ajouter un document</button>
            </div>
          </mat-expansion-panel>

          <mat-expansion-panel class="profile-panel">
            <mat-expansion-panel-header>
              <mat-panel-title>Dépôts logiciels</mat-panel-title>
            </mat-expansion-panel-header>
            <div formArrayName="softwareDeposits" class="stacked-list">
              <div *ngFor="let sd of software.controls; let i = index" [formGroupName]="i" class="inline-row">
                <mat-form-field appearance="outline" class="inline-field">
                  <mat-label>Libellé</mat-label>
                  <input matInput formControlName="label" />
                </mat-form-field>
                <mat-form-field appearance="outline" class="percentage-field">
                  <mat-label>Date</mat-label>
                  <input matInput formControlName="date" />
                </mat-form-field>
                <button mat-icon-button color="warn" type="button" (click)="removeSoftware(i)" aria-label="Supprimer le dépôt logiciel">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
              <button mat-stroked-button color="primary" type="button" class="secondary-btn" (click)="addSoftware()">Ajouter</button>
            </div>
            <div class="panel-actions">
              <button mat-flat-button color="primary" type="button" class="primary-btn" (click)="saveCapitalStructure()">Sauvegarder Répartition</button>
            </div>
          </mat-expansion-panel>
        </mat-accordion>

        <div class="page-actions">
          <button mat-flat-button color="primary" type="submit" class="primary-btn" [disabled]="form.get('raisonSociale')?.invalid || loading">
            <span *ngIf="loading">Sauvegarde...</span>
            <span *ngIf="!loading">Sauvegarder le profil</span>
          </button>
        </div>
      </form>
    </mat-card>
  </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(180deg, #f5f8fc 0%, #edf4ff 100%);
      padding: 32px 16px 48px;
    }

    .profile-page {
      width: min(100%, 1100px);
      margin: 0 auto;
    }

    .profile-card {
      width: min(100%, 1000px);
      margin: 0 auto;
      padding: 28px;
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.96);
      border: 1px solid rgba(11, 31, 58, 0.08);
      box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
    }

    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 24px;
      padding-bottom: 18px;
      border-bottom: 1px solid rgba(11, 31, 58, 0.08);
    }

    .header-copy h2 {
      margin: 0;
      font-size: clamp(1.9rem, 4vw, 2.8rem);
      line-height: 1.1;
      letter-spacing: -0.04em;
      color: #0b1f3a;
    }

    .eyebrow {
      display: inline-block;
      margin-bottom: 10px;
      font-size: 0.75rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #2f6fbd;
      font-weight: 700;
    }

    .profile-form {
      display: grid;
      gap: 18px;
    }

    .summary-grid,
    .general-grid,
    .section-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 12px;
    }

    .full {
      width: 100%;
      display: block;
      margin: 0;
    }

    .error-banner {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 16px;
      border-radius: 18px;
      border: 1px solid #f3c7c4;
      background: #fdecea;
      color: #9b1c1c;
      font-weight: 600;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.4);
    }

    .error-banner mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .profile-panel {
      border: 1px solid rgba(11, 31, 58, 0.08);
      border-radius: 20px;
      background: #fff;
      box-shadow: 0 10px 26px rgba(11, 31, 58, 0.04);
      overflow: hidden;
    }

    .profile-panel .mat-expansion-panel-header {
      min-height: 64px;
      padding: 0 20px;
    }

    .profile-panel .mat-expansion-panel-header-title {
      font-weight: 700;
      color: #0b1f3a;
    }

    .profile-panel .mat-expansion-panel-body {
      padding: 0 20px 20px;
    }

    .panel-actions,
    .page-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 16px;
    }

    .stacked-list {
      display: grid;
      gap: 12px;
    }

    .inline-row,
    .document-row {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
    }

    .inline-field {
      flex: 1 1 260px;
    }

    .percentage-field {
      width: 140px;
    }

    .document-type {
      width: min(100%, 220px);
    }

    .document-status {
      width: min(100%, 160px);
    }

    .document-notes {
      flex: 1 1 240px;
    }

    .primary-btn,
    .secondary-btn {
      height: 46px;
      border-radius: 999px;
      font-weight: 700;
      letter-spacing: 0.01em;
      text-transform: none;
    }

    .primary-btn {
      background: linear-gradient(135deg, #2f6fbd, #0b1f3a) !important;
      color: #fff !important;
      box-shadow: 0 18px 40px rgba(11, 31, 58, 0.18);
    }

    .secondary-btn {
      border: 1px solid rgba(11, 31, 58, 0.2);
      color: #0b1f3a;
      background: #fff;
    }

    .secondary-btn:hover,
    .primary-btn:hover {
      filter: brightness(0.98);
    }

    .mat-mdc-form-field {
      --mdc-outlined-text-field-container-color: rgba(255,255,255,0.93);
      --mdc-outlined-text-field-hover-outline-color: rgba(11, 31, 58, 0.35);
      --mdc-outlined-text-field-focus-outline-color: #0b1f3a;
      --mdc-outlined-text-field-outline-color: rgba(11, 31, 58, 0.2);
      --mdc-outlined-text-field-label-text-color: #475569;
      --mdc-outlined-text-field-input-text-color: #0f172a;
      --mdc-outlined-text-field-caret-color: #0b1f3a;
    }

    .mat-mdc-form-field .mdc-notched-outline {
      border-radius: 16px;
    }

    mat-accordion {
      display: grid;
      gap: 12px;
    }

    @media (max-width: 768px) {
      :host {
        padding: 20px 12px 32px;
      }

      .profile-card {
        padding: 20px 16px;
        border-radius: 20px;
      }

      .page-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .secondary-btn,
      .primary-btn {
        width: 100%;
      }

      .page-actions,
      .panel-actions {
        justify-content: stretch;
      }

      .page-actions .primary-btn,
      .panel-actions .primary-btn {
        width: 100%;
      }

      .inline-row,
      .document-row {
        display: grid;
        grid-template-columns: 1fr;
      }

      .document-type,
      .document-status,
      .document-notes,
      .percentage-field,
      .inline-field {
        width: 100%;
      }
    }
  `]
})
export class CompanyProfileComponent implements OnInit {
  form: FormGroup;
  coreExists = false;
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private svc: CompanyProfileService) {
    this.form = this.fb.group({
      raisonSociale: ['', Validators.required],
      formeJuridique: [''],
      regime: [''],
      capitalSocial: [''],
      enseigne: [''],
      email: ['', Validators.email],
      adresse: [''],
      ville: [''],
      telephoneFax: [''],
      activite: [''],
      registreCommerce: [''],
      matriculeFiscal: [''],
      numEmployeurCnss: [''],
      dateOuverture: [''],
      publicationJort: [''],
      codeDouane: [''],
      activiteSecondaire: [''],
      dateEffet: [''],
      observation: [''],
      manager: this.fb.group({ nomPrenom: [''], dateLieuNaissance: [''], nationalite: [''], adresse: [''], situationFamiliale: [''], passCin: [''], numCnss: [''] }),
      tenantInfo: this.fb.group({ nomPrenom: [''], dateLieuNaissance: [''], nationalite: [''], adresse: [''], passCin: [''], debutContrat: [''], montantLoyer: [''], observationsAugmentation: [''] }),
      fees: this.fb.group({ responsableDossier: [''], dateEffet: [''], montantHonoraires: [''], observationsAugmentation: [''] }),
      capitalStructure: this.fb.array([]),
      legalDocuments: this.fb.array([]),
      softwareDeposits: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.load();
  }

  get capital(): FormArray {
    return this.form.get('capitalStructure') as FormArray;
  }

  get managerGroup(): FormGroup {
    return this.form.get('manager') as FormGroup;
  }

  get tenantGroup(): FormGroup {
    return this.form.get('tenantInfo') as FormGroup;
  }

  get feesGroup(): FormGroup {
    return this.form.get('fees') as FormGroup;
  }

  get legal(): FormArray {
    return this.form.get('legalDocuments') as FormArray;
  }

  get software(): FormArray {
    return this.form.get('softwareDeposits') as FormArray;
  }

  addCapital(): void {
    this.capital.push(this.fb.group({ nomPrenom: ['', Validators.required], partsPourcentage: [null] }));
  }

  removeCapital(i: number): void {
    this.capital.removeAt(i);
  }

  load(): void {
    this.svc.getMyProfile().subscribe({
      next: (res) => {
        if (!res) return;
        this.form.patchValue(res);
        this.coreExists = !!res.id;

        if (res.capitalStructure && res.capitalStructure.length) {
          res.capitalStructure.forEach((c: CapitalStructureEntry) => {
            this.capital.push(this.fb.group({ nomPrenom: [c.nomPrenom], partsPourcentage: [c.partsPourcentage] }));
          });
        }

        if (res.legalDocuments && res.legalDocuments.length) {
          res.legalDocuments.forEach((d: CompanyProfileLegalDocument) => {
            this.legal.push(this.fb.group({ type: [d.type], status: [d.status], filePath: [d.filePath], notes: [d.notes] }));
          });
        }

        if (res.softwareDeposits && res.softwareDeposits.length) {
          res.softwareDeposits.forEach((s: CompanyProfileSoftwareDeposit) => {
            this.software.push(this.fb.group({ label: [s.label], date: [s.date], notes: [s.notes] }));
          });
        }
      }
    });
  }

  addLegal(): void {
    this.legal.push(this.fb.group({ type: ['STATUT'], status: ['MISSING'], filePath: [''], notes: [''] }));
  }

  removeLegal(i: number): void {
    this.legal.removeAt(i);
  }

  addSoftware(): void {
    this.software.push(this.fb.group({ label: [''], date: [''], notes: [''] }));
  }

  removeSoftware(i: number): void {
    this.software.removeAt(i);
  }

  save(): void {
    // legacy - not used
  }

  saveCore(): void {
    if (this.form.get('raisonSociale')?.invalid || this.loading) return;
    this.loading = true;
    this.errorMessage = '';
    const payload = {
      raisonSociale: this.form.get('raisonSociale')?.value,
      enseigne: this.form.get('enseigne')?.value,
      email: this.form.get('email')?.value,
      adresse: this.form.get('adresse')?.value,
      ville: this.form.get('ville')?.value,
      telephoneFax: this.form.get('telephoneFax')?.value,
      activite: this.form.get('activite')?.value,
      observation: this.form.get('observation')?.value
    };
    this.svc.saveCore(payload).subscribe({ next: (res) => {
      this.loading = false;
      this.coreExists = true;
      this.form.patchValue(res);
      alert('Profil de base sauvegardé');
    }, error: (err: HttpErrorResponse) => {
      this.loading = false;
      console.error('Save core error', err);
      this.errorMessage = err.status === 0 ? 'Impossible de contacter le serveur backend.' : (err.error?.message || 'Erreur lors de la sauvegarde');
    }});
  }

  saveManager(): void {
    if (this.loading) return;
    this.loading = true;
    const payload = this.managerGroup.getRawValue();
    this.svc.saveManager(payload).subscribe({ next: (res) => {
      this.loading = false;
      this.form.patchValue({ manager: res.manager });
      alert('Gérant sauvegardé');
    }, error: (err: HttpErrorResponse) => {
      this.loading = false;
      console.error('Save manager error', err);
      this.errorMessage = err.status === 0 ? 'Impossible de contacter le serveur backend.' : (err.error?.message || 'Erreur lors de la sauvegarde');
    }});
  }

  saveCapitalStructure(): void {
    if (this.loading) return;
    this.loading = true;
    const list = this.capital.controls.map(c => ({ nomPrenom: c.get('nomPrenom')?.value, partsPourcentage: Number(c.get('partsPourcentage')?.value) }));
    this.svc.saveCapitalStructure(list).subscribe({ next: (res) => {
      this.loading = false;
      this.form.patchValue({ capitalStructure: res.capitalStructure });
      alert('Répartition du capital sauvegardée');
    }, error: (err: HttpErrorResponse) => {
      this.loading = false;
      console.error('Save capital error', err);
      this.errorMessage = err.status === 0 ? 'Impossible de contacter le serveur backend.' : (err.error?.message || 'Erreur lors de la sauvegarde');
    }});
  }
}
