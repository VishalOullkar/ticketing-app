import { Pipe, PipeTransform } from '@angular/core';
import { Incident } from '../Models/incident';

@Pipe({
  name: 'raisedTicketList'
})
export class RaisedTicketListPipe implements PipeTransform {

  transform(incidents: Incident[], searchTerm: string): Incident[] {
    if (!incidents || !searchTerm) {
      return incidents;
    }

    return incidents.filter(Incident =>
      Incident.IncidentCode.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
   
  }

  //transform(incidents: Incident[], searchTerm: string): Incident[] {
  //  if (searchTerm === undefined) return incidents;

  //  return incidents.filter(function (ins) {
  //    return ins.IncidentCode.toLowerCase().includes(searchTerm.toLowerCase());
  //  })
  //}

}
