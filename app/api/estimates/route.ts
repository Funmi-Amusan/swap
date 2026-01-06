import { NextRequest, NextResponse } from 'next/server';
import { getPhoneModels, getPhoneConditions, getPricingRules, calculatePrice, getConditionAttributeGroups, calculateMultiFactorPrice } from '@/app/lib/admin-utils';
import { sendSwapConfirmationEmail } from '@/app/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Check if this is an email request from the trade-in flow
    if (body.sendEmail && body.email) {
      const { 
        email, 
        tradeInDevice, 
        newDevice, 
        tradeInPrice, 
        newPhonePrice, 
        amountToPay 
      } = body;

      // Send the email
      const emailResult = await sendSwapConfirmationEmail({
        to: email,
        swapDetails: {
          tradeInPhone: tradeInDevice,
          newPhone: newDevice,
          tradeInValue: tradeInPrice,
          newPhonePrice: newPhonePrice,
          amountToPay: amountToPay,
          swapMethod: 'pending' // User hasn't selected swap method yet
        }
      });

      return NextResponse.json({ 
        success: emailResult.success,
        message: emailResult.success ? 'Email sent successfully' : 'Failed to send email'
      });
    }

    // Original price calculation logic
    const { phoneModelValue, conditionValue, attributes } = body as {
      phoneModelValue: string;
      conditionValue?: string;
      attributes?: Record<string, string>;
    };

    if (!phoneModelValue) {
      return NextResponse.json({ error: 'Missing phoneModelValue' }, { status: 400 });
    }

    const [models, rules] = await Promise.all([
      getPhoneModels(),
      getPricingRules(),
    ]);

    const selectedModel = models.find((m: any) => m.value === phoneModelValue);
    if (!selectedModel) {
      return NextResponse.json({ error: 'Invalid model' }, { status: 400 });
    }

    // Filter applicable pricing rules
    const applicableRules = rules.filter((rule: any) =>
      rule.baseModel === phoneModelValue || rule.baseModel === '*'
    );

    // New multi-factor attributes path
    if (attributes && Object.keys(attributes).length > 0) {
      const groups = await getConditionAttributeGroups();
      const modifiers: number[] = [];
      const selectedAttributeLabels: Record<string, string> = {};

      for (const [key, value] of Object.entries(attributes)) {
        const group = groups.find(g => g.key === key);
        if (!group) continue; // ignore unknown keys
        const option = group.options.find(o => o.value === value);
        if (option) {
          modifiers.push(option.priceModifier);
          selectedAttributeLabels[key] = option.label;
        }
      }

      const tradeInValue = calculateMultiFactorPrice(
        selectedModel.basePrice,
        modifiers,
        applicableRules
      );

      return NextResponse.json({
        tradeInValue,
        modelLabel: selectedModel.label,
        attributes: selectedAttributeLabels,
        basePrice: selectedModel.basePrice,
      });
    }

    // Backward compatibility: single conditionValue path
    if (!conditionValue) {
      return NextResponse.json({ error: 'Missing conditionValue or attributes' }, { status: 400 });
    }

    const conditions = await getPhoneConditions();
    const selectedCondition = conditions.find((c: any) => c.value === conditionValue);
    if (!selectedCondition) {
      return NextResponse.json({ error: 'Invalid condition' }, { status: 400 });
    }

    const tradeInValue = calculatePrice(
      selectedModel.basePrice,
      selectedCondition.priceModifier,
      applicableRules
    );

    return NextResponse.json({
      tradeInValue,
      modelLabel: selectedModel.label,
      conditionLabel: selectedCondition.label,
      basePrice: selectedModel.basePrice,
    });
  } catch (error) {
    console.error('Error calculating price:', error);
    return NextResponse.json({ error: 'Failed to calculate price' }, { status: 500 });
  }
}
