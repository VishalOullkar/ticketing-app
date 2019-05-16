import { Pipe, PipeTransform } from '@angular/core';
import { Incident } from '../Models/incident';

@Pipe({
  name: 'searchIncidents'
})
export class SearchIncidentsPipe implements PipeTransform {

  transform(incidents: Incident[], searchTerm: string): Incident[] {

    if (searchTerm == undefined||searchTerm == null)
    {
      return incidents;
    }

    if (!incidents || !searchTerm) {
      return incidents;
    }

    return incidents.filter(incident =>
      incident.IncidentCode.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

  }

}
