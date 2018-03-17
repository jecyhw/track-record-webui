import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-file-upload',
    template: `
        <nz-row class="pt-lg">
            <app-track-file-upload></app-track-file-upload>
            <app-last-week-state></app-last-week-state>
        </nz-row>`,
    styles: []
})
export class FileUploadComponent {

    // @ViewChild(LastWeekStateComponent) lastWeekStateComp: LastWeekStateComponent;
    constructor() {
    }

    // _onReuseDestroy() {
    //     this.lastWeekStateComp.ngOnDestroy();
    // }
}
