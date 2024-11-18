<?php

namespace App\Tests\Entity;

use App\Entity\UserRegistration;
use PHPUnit\Framework\TestCase;

class UserRegistrationTest extends TestCase
{
    public function testUserRegistration(): void
    {
        $user = new UserRegistration();

        $user->setName('João Silva');
        $user->setBirthdate(new \DateTime('1990-01-01'));
        $user->setStreet('Rua Principal');
        $user->setNumber(123);
        $user->setZipCode('12345678');
        $user->setCity('São Paulo');
        $user->setState('SP');
        $user->setPhone('1123456789');
        $user->setMobile('11987654321');

        $this->assertEquals('João Silva', $user->getName());
        $this->assertEquals('1990-01-01', $user->getBirthdate()->format('Y-m-d'));
        $this->assertEquals('Rua Principal', $user->getStreet());
        $this->assertEquals(123, $user->getNumber());
        $this->assertEquals('12345678', $user->getZipCode());
        $this->assertEquals('São Paulo', $user->getCity());
        $this->assertEquals('SP', $user->getState());
        $this->assertEquals('1123456789', $user->getPhone());
        $this->assertEquals('11987654321', $user->getMobile());
    }
}
