import { View } from 'react-native';
import {
  Accordion as AccordionGluestack,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionContentText,
  AccordionIcon,
} from '@/components/ui/accordion';
import { ChevronDownIcon, ChevronUpIcon } from '../ui/icon';
import { AccordionProps } from './accordionDTO';

export function Accordion({
  size,
  variant,
  type,
  isCollapsible,
  disabled,
  items,
  onValueChange,
}: AccordionProps) {
  return (
    <View>
      <AccordionGluestack
        size={size}
        variant={variant}
        type={type}
        isCollapsible={isCollapsible}
        isDisabled={disabled}
        onValueChange={onValueChange}
        className="m-5 w-[90%] border border-outline-200"
      >
        {items.map(items => {
          return (
            <AccordionItem
              value={items.value}
              key={items.value}
              isDisabled={items.disabled}
            >
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }: { isExpanded: boolean }) => {
                    return (
                      <>
                        <AccordionTitleText>{items.header}</AccordionTitleText>
                        {isExpanded ? (
                          <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                        ) : (
                          <AccordionIcon
                            as={ChevronDownIcon}
                            className="ml-3"
                          />
                        )}
                      </>
                    );
                  }}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <AccordionContentText>{items.content}</AccordionContentText>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </AccordionGluestack>
    </View>
  );
}
