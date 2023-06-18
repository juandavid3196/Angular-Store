import { NgModule } from "@angular/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    exports :[
        MatToolbarModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule
    ],

})

export class MaterialModule {}