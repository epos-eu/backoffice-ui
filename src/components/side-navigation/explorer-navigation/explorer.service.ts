import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormTree } from './formTree';

@Injectable({
  providedIn: 'root',
})
export class ExplorerService {
  private formTree = new BehaviorSubject<Array<FormTree>>([]);
  public formTreeObs = this.formTree.asObservable();

  private goto = new BehaviorSubject<string>('');
  public gotoObs = this.goto.asObservable();

  public setFormSection(parent: string | null, section: FormTree, start: boolean) {
    let root: Array<FormTree> = [];
    if (start === false && parent !== null) {
      root = this.recursiveSearch(this.formTree.getValue(), parent, section);
    } else {
      root.push(section);
    }

    this.formTree.next(root);
  }

  public setFormTreeActive(id: string): void {
    this.formTree.next(this.setActive(this.formTree.getValue(), id));
  }

  private recursiveSearch(formTree: Array<FormTree>, parent: string, node: FormTree): Array<FormTree> {
    formTree.forEach((branch: FormTree) => {
      if (branch.id === parent) {
        branch.children.push(node);
      } else {
        this.recursiveSearch(branch.children, parent, node);
      }
    });
    return formTree;
  }

  private setActive(formTree: Array<FormTree>, id: string): Array<FormTree> {
    formTree.forEach((branch: FormTree) => {
      branch.active = false;
      if (branch.id === id) {
        branch.active = true;
      } else {
        this.setActive(branch.children, id);
      }
    });
    return formTree;
  }

  public goTo(id: string) {
    if (id !== '') {
      this.goto.next(id);
    }
  }
}
