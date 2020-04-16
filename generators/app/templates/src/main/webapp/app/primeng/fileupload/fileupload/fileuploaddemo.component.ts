import { Component, OnInit } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'jhi-fileupload',
    templateUrl: './fileuploaddemo.component.html',
    styles: []
})
export class FileUploadDemoComponent implements OnInit {

    activeIndex = 0;
    multiple: boolean;
    auto: boolean;
    uploadedFiles: any[];

    constructor(private messageService: MessageService) {
        this.multiple = false;
        this.auto = false;
        this.uploadedFiles = [];
    }

    ngOnInit(): void {}

    onBeforeSend(event: object): void {
        (event.xhr as XMLHttpRequest).setRequestHeader('jwt', 'xyz123');
    }

    onUpload(event: object): void {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

    onChangeStep(label: string): void {
        this.messageService.add({severity: 'info', summary: label});
    }
}
