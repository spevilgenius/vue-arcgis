/* eslint-disable */
var listdata = module.exports = {
  lists: [
    {
      'title': 'Missions',
      'description': 'A list of missions',
      'fields': [
        {
          'Title': 'Title',
          'DisplayName': 'Mission',
          'Type': 'Title',
          'Required': 'true'
        },
        {
          'Title': 'StartDate',
          'DisplayName': 'Mission Start Date',
          'Type': 'DateTime',
          'Format': 'DateOnly',
          'Required': 'true'
        },
        {
          'Title': 'EndDate',
          'DisplayName': 'Mission End Date',
          'Type': 'DateTime',
          'Format': 'DateOnly',
          'Required': 'true'
        },
        //{
        //  'Title': 'MissionCategory',
        //  'DisplayName': 'MissionCategory',
        //  'Type': 'Text',
        //  'Required': 'false',
        //  'JSLink': '~sitecollection/SiteAssets/html/static/js/MissionCategory.js'
        //},
        {
          'Title': 'Task',
          'DisplayName': 'Mission Task or Purpose',
          'Type': 'Note',
          'Required': 'true'
        },
        {
          'Title': 'Latitude',
          'DisplayName': 'Latitude',
          'Type': 'Text',
          'Required': 'true'
        },
        {
          'Title': 'Longitude',
          'DisplayName': 'Longitude',
          'Type': 'Text',
          'Required': 'true'
        },
        {
          'Title': 'Organization',
          'DisplayName': 'Organization',
          'Type': 'Choice',
          'Required': 'true',
          'Choices': 'ARCIC, ArmyU, AWG, CAC, CAC-T, Cadet Command, CALL, CASCOM/SCoE, CGSC, CIMT, Cyber CoE, DLIFLC, FCoE, TRADOC G-2, ICoE, MCCoE, MCoE, MCTP, MSCoE, REF, SATFA, TRADOC HQ, USAACE, USAREC, USASMA, None'
        },
        {
          'Title': 'PAX',
          'DisplayName': 'Number of PAX',
          'Type': 'Number',
          'Required': 'true'
        },
        {
          'Title': 'PAXNames',
          'DisplayName': 'PAX Names',
          'Type': 'Note',
          'Required': 'true'
        },
        {
          'Title': 'IconImage',
          'DisplayName': 'Icon Image',
          'Type': 'Picture',
          'Required': 'true'
        },
        {
          'Title': 'AuthOfficial',
          'DisplayName': 'Authorizing Official',
          'Type': 'Text',
          'Required': 'true'
        },
        {
          'Title': 'MissionType',
          'DisplayName': 'Mission Type',
          'Type': 'MultiChoice',
          'Required': 'true',
          'Choices': 'Advisory Assistance, Army to Army Staff Talks, Combat Operations, Complex OE Development, Human Dimension/Adaptability, KLE-Key Leader Engagement, Lessons, Learned, MTT, Other-Stated in the Missions Purpose field, RAF Support, Rapid Equipping, SFA-Security Force Assistance, SME Exchange, SOF to CF Interdependence, Solution Development, Threat Assessment, TSC-Theater Security Cooperation, Vulnerability Assessment'
        },
        {
          'Title': 'SupportedInitiative',
          'DisplayName': 'Supported Initiative',
          'Type': 'Text',
          'Required': 'true'
        },
        {
          'Title': 'OtherInitiative',
          'DisplayName': 'Other Supported Initiatives',
          'Type': 'Text',
          'Required': 'false'
        },
        {
          'Title': 'UnitPOC',
          'DisplayName': 'UNIT POC',
          'Type': 'Text',
          'Required': 'true'
        },
        {
          'Title': 'EstimatedCost',
          'DisplayName': 'Estimated Cost',
          'Type': 'Text',
          'Required': 'true'
        },
        {
          'Title': 'FundingSource',
          'DisplayName': 'Funding Source',
          'Type': 'Text',
          'Required': 'true'
        },
        {
          'Title': 'Coordination',
          'DisplayName': 'Prior Coordination',
          'Type': 'MultiChoice',
          'Required': 'true',
          'Choices': 'AWG, REF, G-1/4, G-2, G-3/5/7, G-6, G-8, G-9, CALL, MCoE, FCoE, MSCoE, MCCoE, SCoE, CCoE, ICoE, AVN CoE, USAREC, USACC, DLI, INCOPD, ARCIC, CAC, IMT, LNO ARCIC, LNO CAC, LNO CALL, LNO AWG, TRADOC Staff Other'
        },
        {
          'Title': 'Reviewed',
          'DisplayName': 'Command Reviewed and Approved',
          'Type': 'Choice',
          'Required': 'true',
          'Choices': 'Yes, No, Pending',
          'Default': 'Pending'
        }
      ]
    },
    {
      'title': 'LNO',
      'description': 'A list of Liaison Officers',
      'fields': [
        {
          'Title': 'Latitude',
          'DisplayName': 'Latitude',
          'Type': 'Text',
          'Required': 'true'
        },
        {
          'Title': 'Longitude',
          'DisplayName': 'Longitude',
          'Type': 'Text',
          'Required': 'true'
        },
        {
          'Title': 'City',
          'DisplayName': 'City',
          'Type': 'Text',
          'Required': 'true'
        },
        {
          'Title': 'Phone',
          'DisplayName': 'Phone',
          'Type': 'Text',
          'Required': 'true'
        },
        {
          'Title': 'NIPR',
          'DisplayName': 'NIPR Email',
          'Type': 'Text',
          'Required': 'true'
        },
        {
          'Title': 'SIPR',
          'DisplayName': 'SIPR Email',
          'Type': 'Text',
          'Required': 'true'
        },
        {
          'Title': 'Contact',
          'DisplayName': 'Contact',
          'Type': 'Note',
          'Required': 'true'
        },
        {
          'Title': 'Organization',
          'DisplayName': 'Organization',
          'Type': 'Choice',
          'Required': 'true',
          'Choices': 'ARCIC, AWG, CAC, CALL, REF, TRADOC'
        },
        {
          'Title': 'SupportedOrg',
          'DisplayName': 'SupportedOrg',
          'Type': 'Choice',
          'Required': 'true',
          'Choices': 'USARAF, USARPAC, ARSOUTH, FORSCOM, NORTHCOM, SOUTHCOM, CENTCOM, SOCOM, AFRICOM, EUCOM, HQTRADOC, CAC, PACOM, JRTC, NTC, ARCENT, USAREUR, ARNORTH, CJTF HOA , USMA'
        }
      ]
    },
    {
      'title': 'Initiatives',
      'description': 'A list of Support Initiatives',
      'fields': [
        {
          'Title': 'Description',
          'DisplayName': 'Description',
          'Type': 'Note',
          'Required': 'true'
        }
      ]
    }
  ]
}
