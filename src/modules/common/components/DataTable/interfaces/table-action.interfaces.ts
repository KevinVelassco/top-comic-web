export interface TableAction {
  key: 'editRecord' | 'deleteRecord';
  description?: string;
  class: string;

  eventName: 'init-updating' | 'init-deleting';
  //eventName: 'edit-record' | 'delete-record';
}
