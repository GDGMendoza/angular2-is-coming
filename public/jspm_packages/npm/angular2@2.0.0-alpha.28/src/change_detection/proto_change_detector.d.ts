import { ProtoChangeDetector, ChangeDetectorDefinition } from './interfaces';
import { DynamicChangeDetector } from './dynamic_change_detector';
import { PipeRegistry } from './pipes/pipe_registry';
import { BindingRecord } from './binding_record';
import { ProtoRecord } from './proto_record';
export declare class DynamicProtoChangeDetector implements ProtoChangeDetector {
    private _pipeRegistry;
    private definition;
    _records: List<ProtoRecord>;
    constructor(_pipeRegistry: PipeRegistry, definition: ChangeDetectorDefinition);
    instantiate(dispatcher: any): DynamicChangeDetector;
    _createRecords(definition: ChangeDetectorDefinition): List<ProtoRecord>;
}
export declare class ProtoRecordBuilder {
    records: List<ProtoRecord>;
    constructor();
    add(b: BindingRecord, variableNames?: List<string>): void;
    _appendRecords(b: BindingRecord, variableNames: List<string>): void;
}
export declare var __esModule: boolean;