import type { Schema, Attribute } from '@strapi/strapi';

export interface SkillBarSkillBar extends Schema.Component {
  collectionName: 'components_skill_bar_skill_bars';
  info: {
    displayName: 'skillBar';
    description: '';
  };
  attributes: {
    skill: Attribute.Integer;
    title: Attribute.String;
  };
}

export interface SkillLabelSkillLabel extends Schema.Component {
  collectionName: 'components_skill_label_skill_labels';
  info: {
    displayName: 'SkillLabel';
  };
  attributes: {
    labelName: Attribute.String;
  };
}

export interface WorkExperienceWorkExperience extends Schema.Component {
  collectionName: 'components_work_experience_work_experiences';
  info: {
    displayName: 'WorkExperience';
    description: '';
  };
  attributes: {
    role: Attribute.String;
    organisationName: Attribute.String;
    fromDate: Attribute.Date;
    toDate: Attribute.Date;
    achievements: Attribute.Blocks;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'skill-bar.skill-bar': SkillBarSkillBar;
      'skill-label.skill-label': SkillLabelSkillLabel;
      'work-experience.work-experience': WorkExperienceWorkExperience;
    }
  }
}
