import { Component, OnInit, ViewChild} from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import {MessageService, TreeNode, MenuItem} from 'primeng/api';
import {TreeNodeService} from './service/treenode.service';
import {Tree} from 'primeng/tree/tree';

@Component({
    selector: 'jhi-tree',
    templateUrl: './treedemo.component.html',
    styles: []
})
export class TreeDemoComponent implements OnInit {
    activeIndex = 0;

    @ViewChild('expandingTree', { static: false })
    expandingTree: Tree;

    basicTree: TreeNode[];
    singleSelectionTree: TreeNode[];
    multipleSelectionTree: TreeNode[];
    checkboxSelectionTree: TreeNode[];
    templateTree: TreeNode[];
    horizontalTree: TreeNode[];
    lazyTree: TreeNode[];
    contextMenuTree: TreeNode[];
    dragDropTreeOne: TreeNode[];
    dragDropTreeTwo: TreeNode[];
    programmaticTree: TreeNode[];

    selectedPlace: TreeNode;

    selectedPlaces: TreeNode[];

    selectMultiplePlaces: TreeNode[];

    selectedTour: TreeNode[];

    selectedTouristPlace: TreeNode[];

    items: MenuItem[];

    constructor(private nodeService: TreeNodeService, private messageService: MessageService) {
        this.basicTree = [];
        this.singleSelectionTree = [];
        this.multipleSelectionTree = [];
        this.checkboxSelectionTree = [];
        this.templateTree = [];
        this.horizontalTree = [];
        this.lazyTree = [];
        this.contextMenuTree = [];
        this.dragDropTreeOne = [];
        this.dragDropTreeTwo = [];
        this.programmaticTree = [];
        this.selectedPlace = {} as TreeNode;
        this.selectedPlaces = [];
        this.selectMultiplePlaces = [];
        this.selectedTour = [];
        this.selectedTouristPlace = [];
        this.items = [];
        this.expandingTree = {};
    }

    ngOnInit(): void {
        this.nodeService.getTouristPlaces().subscribe((places: any) => this.basicTree = places.data);
        this.nodeService.getTouristPlaces().subscribe((places: any) => this.singleSelectionTree = places.data);
        this.nodeService.getTouristPlaces().subscribe((places: any) => this.multipleSelectionTree = places.data);
        this.nodeService.getTouristPlaces().subscribe((places: any) => this.checkboxSelectionTree = places.data);
        this.nodeService.getTouristPlaces().subscribe((places: any) => this.templateTree = places.data);
        this.nodeService.getTouristPlaces().subscribe((places: any) => this.programmaticTree = places.data);
        this.nodeService.getTouristPlaces().subscribe((places: any) => this.lazyTree = places.data);
        this.nodeService.getTouristPlaces().subscribe((places: any) => this.contextMenuTree = places.data);
        this.nodeService.getTouristPlaces().subscribe((places: any) => this.dragDropTreeOne = places.data);
        this.nodeService.getTouristPlaces().subscribe((places: any) => {
            this.horizontalTree = [{
                label: 'Root',
                children: places.data
            }];
        });
        this.nodeService.getTouristPlaces().subscribe((files: any) => this.dragDropTreeOne = files.data);

        this.dragDropTreeTwo = [
            {
                label: 'Selection',
                data: 'Selected tourist package',
                expandedIcon: 'fa fa-folder-open',
                collapsedIcon: 'fa fa-folder'
            }
        ];

        this.items = [
            {label: 'View', icon: 'fa fa-search', command: (event: object) => this.viewFile(this.selectedTouristPlace)},
            {label: 'Unselect', icon: 'fa fa-close', command: (event: object) => this.unselectFile()}
        ];
    }

    nodeSelect(event: object): void {
        this.messageService.add({severity: 'info', summary: 'Node Selected', detail: event.node.label});
    }

    nodeUnselect(event: object): void {
        this.messageService.add({severity: 'info', summary: 'Node Unselected', detail: event.node.label});
    }

    nodeExpandMessage(event: object): void {
        this.messageService.add({severity: 'info', summary: 'Node Expanded', detail: event.node.label});
    }

    nodeExpand(event: object): void {
        if (event.node) {
            // in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
            this.nodeService.getTouristPlaces().subscribe((nodes: any) => event.node.children = nodes.data);
        }
    }

    viewFile(selectPlace: TreeNode[]): void {
        this.messageService.add({severity: 'info', summary: 'Node selected with right click', detail: selectPlace[0].label});
    }

    unselectFile(): void {
        this.selectedTouristPlace = {} as TreeNode;
    }

    expandAll(): void {
        this.programmaticTree.forEach( (node: any) => {
            this.expandRecursive(node, true);
        } );
    }

    collapseAll(): void {
        this.programmaticTree.forEach((node: any) => {
            this.expandRecursive(node, false);
        } );
    }

    expandRecursive(node: TreeNode, isExpand: boolean): void {
        node.expanded = isExpand;
        if (node.children) {
            node.children.forEach(childNode => {
                this.expandRecursive(childNode, isExpand);
            } );
        }
    }
    onChangeStep(label: string): void {
        this.messageService.add({severity: 'info', summary: label});
    }
}
