import { Component, OnInit } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import {MessageService, TreeNode, MenuItem} from 'primeng/api';
import {TreeNodeService} from './service/treenode.service';

@Component({
    selector: 'jhi-treetable',
    templateUrl: './treetabledemo.component.html',
    styles: []
})
export class TreeTableDemoComponent implements OnInit {

    activeIndex = 0;

    basicTreeTable: TreeNode[];

    singleSelectionTreeTable: TreeNode[];

    multipleSelectionTreeTable: TreeNode[];

    checkboxSelectionTreeTable: TreeNode[];

    templateTreeTable: TreeNode[];

    contextmenuTreeTable: TreeNode[];

    lazyTreeTable: TreeNode[];

    selectedTouristPlace: TreeNode;

    selectedPlace: TreeNode;

    selectedTouristPlaces: TreeNode[];

    selectedMultiTouristPlaces: TreeNode[];

    items: MenuItem[];

    cols: any[];

    loading: boolean;

    constructor(private nodeService: TreeNodeService, private messageService: MessageService) {
        this.basicTreeTable = [];
        this.singleSelectionTreeTable = [];
        this.multipleSelectionTreeTable = [];
        this.checkboxSelectionTreeTable = [];
        this.templateTreeTable = [];
        this.contextmenuTreeTable =[];
        this.lazyTreeTable = [];
        this.selectedTouristPlace = {} as TreeNode;
        this.selectedPlace = {} as TreeNode;
        this.selectedMultiTouristPlaces = [];
        this.selectedMultiTouristPlaces = [];
        this.items = [];
        this.cols = [];
        this.loading = false;
    }

    onChangeStep(label: string): void {
        this.messageService.add({severity: 'info', summary: label});
    }

    ngOnInit(): void {
        this.nodeService.getTouristPlaces().subscribe((places: any) => this.basicTreeTable = places.data);
        this.nodeService.getTouristPlaces().subscribe((places: any) => this.singleSelectionTreeTable = places.data);
        this.nodeService.getTouristPlaces().subscribe((places: any) => this.multipleSelectionTreeTable = places.data);
        this.nodeService.getTouristPlaces().subscribe((places: any) => this.checkboxSelectionTreeTable = places.data);
        this.nodeService.getTouristPlaces().subscribe((places: any) => this.templateTreeTable = places.data);
        this.nodeService.getTouristPlaces().subscribe((places: any) => this.contextmenuTreeTable = places.data);
        this.nodeService.getTouristPlaces().subscribe((places: any) => this.lazyTreeTable = places.data);

        this.items = [
            {label: 'View', icon: 'fa fa-search', command: event => this.viewNode(this.selectedPlace)},
            {label: 'Delete', icon: 'fa fa-close', command: event => this.deleteNode(this.selectedPlace)}
        ];

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'days', header: 'Days' },
            { field: 'type', header: 'Type' }
        ];
        this.loading = true;
    }

    nodeSelect(event: object): void {
        this.messageService.add({severity: 'info', summary: 'Node Selected', detail: event.node.data.name});
    }

    nodeUnselect(event: object): void {
        this.messageService.add({severity: 'info', summary: 'Node Unselected', detail: event.node.data.name});
    }

    onRowDblclick(event: object): void {
        this.messageService.add({severity: 'info', summary: 'Node Selected', detail: 'The TreeTable row double click is invoked'});
    }

    nodeExpand(event: object): void {
        if (event.node) {
            // in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
            this.nodeService.getTouristPlaces().subscribe((nodes: any) => event.node.children = nodes.data);
        }
    }

    viewNode(node: TreeNode): void {
        this.messageService.add({severity: 'info', summary: 'Node Selected', detail: node.data.name});
    }

    deleteNode(node: TreeNode): void {
        if (node.parent) {
            node.parent.children = node.parent.children.filter(n => n.data !== node.data);
        }
        this.messageService.add({severity: 'info', summary: 'Node Deleted', detail: node.data.name});
    }

    loadNodes(event: object): void {
        this.loading = true;

        // in a production application, make a remote request to load data using state metadata from event
        // event.first = First row offset
        // event.rows = Number of rows per page
        // event.sortField = Field name to sort with
        // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        // filters: FilterMetadata object having field as key and filter value, filter matchMode as value

        // imitate db connection over a network
        setTimeout(() => {
            this.loading = false;
            this.lazyTreeTable = [];

            for (let i = 0; i < event.rows; i++) {
                const node = {
                    data: {
                        name: 'Country ' + (event.first + i),
                        days: Math.floor(Math.random() * 100) + 1,
                        type: 'Type ' + (event.first + i)
                    },
                    leaf: false
                };

                this.lazyTreeTable.push(node);
            }
        }, 1000);
    }

    onNodeExpandLazy(event: object): void {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
            const node = event.node;

            node.children = [
                {
                    data: {
                        name: node.data.name + ' - 0',
                        days: Math.floor(Math.random() * 100) + 1,
                        type: 'Type0'
                    },
                },
                {
                    data: {
                        name: node.data.name + ' - 1',
                        days: Math.floor(Math.random() * 100) + 1,
                        type: 'Type1'
                    }
                }
            ];

            this.lazyTreeTable = [...this.lazyTreeTable];
        }, 250);

    }
}
