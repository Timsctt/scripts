import styled, { StyledComponent } from '@emotion/styled';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import TockTheme from '../../styles/theme';
import { prop } from 'styled-tools';

export const CalendarGraphCardOuter: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  unknown,
  TockTheme
> = styled.div`
  max-width: ${prop<any>('theme.sizing.conversation.width')};
  margin: 0.5em auto;
`;

export const CalendarGraphCardContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  unknown,
  TockTheme
> = styled.div`
  padding: 0.5em;
  background: rgb(238, 238, 238) none repeat scroll 0% 0%;
  color: ${prop<any>('theme.palette.text.card')};
  border-radius: 6px;
  width: 13em;
  overflow-wrap: break-word;

  ${prop<any>('theme.overrides.card.cardContainer', '')};
`;

const CalendarGraphCardSubjet: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
  unknown,
  TockTheme
> = styled.h3`
  margin: 0.5em 0;
  font-size: 14px;

  ${prop<any>('theme.overrides.card.cardTitle', '')};
`;

const CalendarGraphCardBodyPreview: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
  unknown,
  TockTheme
> = styled.h4`
  margin: 0.5em 0;
  font-size: 14px;
  color: #4a4a4a;

  ${prop<any>('theme.overrides.card.cardSubTitle', '')};
`;

export interface CalendarGraphCardProps {
  subject?: string;
  bodyPreview?: string;
  start?: string;
  end?: string;
  location?: string;
}

const CalendarGraphCard = React.forwardRef<
  HTMLDivElement,
  CalendarGraphCardProps
>(function cardRender(
  { subject, bodyPreview, start, end, location }: CalendarGraphCardProps,
  ref,
) {
  return (
    <CalendarGraphCardOuter ref={ref}>
      <CalendarGraphCardContainer>
        <CalendarGraphCardSubjet>{subject}</CalendarGraphCardSubjet>
        {bodyPreview && (
          <CalendarGraphCardBodyPreview>
            <div>Organisateur : {bodyPreview}</div>
          </CalendarGraphCardBodyPreview>
        )}
        <div>
          <div>Début : {start}</div>
          <div>Fin : {end}</div>
        </div>
        <div>Lieu : {location == undefined ? 'inconnu' : location}</div>
      </CalendarGraphCardContainer>
    </CalendarGraphCardOuter>
  );
});

export default CalendarGraphCard;
