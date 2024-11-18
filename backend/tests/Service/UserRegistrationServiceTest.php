<?php

namespace App\Tests\Service;

use App\Entity\UserRegistration;
use App\Service\UserRegistrationService;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;

class UserRegistrationServiceTest extends TestCase
{
    /** @var EntityManagerInterface&\PHPUnit\Framework\MockObject\MockObject */
    private $entityManagerMock;
    private $service;
    
    protected function setUp(): void
    {
        $this->entityManagerMock = $this->createMock(EntityManagerInterface::class);
        $this->service = new UserRegistrationService($this->entityManagerMock);
    }

    public function testSaveStep1(): void
    {
        $data = [
            'name' => 'João Silva',
            'birthdate' => '1990-01-01',
        ];

        $this->entityManagerMock
            ->expects($this->once())
            ->method('persist')
            ->with($this->callback(function ($user) use ($data) {
                return $user instanceof UserRegistration &&
                    $user->getName() === $data['name'] &&
                    $user->getBirthdate()->format('Y-m-d') === $data['birthdate'];
            }));

        $this->entityManagerMock
            ->expects($this->once())
            ->method('flush');

        $user = $this->service->saveStep1($data);

        $this->assertInstanceOf(UserRegistration::class, $user);
        $this->assertEquals($data['name'], $user->getName());
        $this->assertEquals($data['birthdate'], $user->getBirthdate()->format('Y-m-d'));
    }
}
